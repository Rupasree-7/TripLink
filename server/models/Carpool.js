const mongoose = require("mongoose");

const CarpoolSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  origin: String,
  destination: String,
  departAt: Date,
  seatsAvailable: Number,
  pricePerSeat: Number,
});

module.exports = mongoose.model("Carpool", CarpoolSchema);
