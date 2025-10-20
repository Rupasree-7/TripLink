// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ["user", "driver"], default: "user" },
  license: { type: String }, // only for drivers
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], default: [0, 0] }, // [longitude, latitude]
  },
  available: { type: Boolean, default: true }, // only for drivers
});

userSchema.index({ location: "2dsphere" }); // enables geospatial queries

const User = mongoose.model("User", userSchema);
export default User;
