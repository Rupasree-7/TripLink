const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vehicle: String,
  seats: Number,
  rating: { type: Number, default: 5 },
  location: String,
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model("Driver", DriverSchema);
