// backend/models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["carpool", "designated"], required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  fare: { type: Number },
  distanceKm: { type: Number },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
