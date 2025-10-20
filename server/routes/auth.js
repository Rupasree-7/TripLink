import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "your_jwt_secret"; // store in env for production

// DRIVER / USER Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, type, licenseNo } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      type,
      licenseNo: type === "driver" ? licenseNo : undefined,
    });

    const token = jwt.sign({ id: user._id, type: user.type }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id, type: user.type }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// backend/routes/auth.js
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Wrong password" });

  res.json({ message: "Thanks for logging in!", user });
});


export default router;
