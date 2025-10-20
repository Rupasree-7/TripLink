const express = require("express");
const router = express.Router();
const Carpool = require("../models/Carpool");

router.get("/", async (req, res) => {
  try {
    const carpools = await Carpool.find().populate("driver");
    res.json(carpools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const carpool = new Carpool(req.body);
    await carpool.save();
    res.status(201).json(carpool);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
