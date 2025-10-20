// server/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/booking.js";

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

// Serve React frontend in production
const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

// Catch-all route for SPA (React)
app.use((req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
