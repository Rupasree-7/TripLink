import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vehicle: String,
  seats: Number,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [longitude, latitude]
  },
  rating: { type: Number, default: 5 },
  available: { type: Boolean, default: true }
});

// Add geospatial index
driverSchema.index({ location: "2dsphere" });

export default mongoose.model("Driver", driverSchema);
