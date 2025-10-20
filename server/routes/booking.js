// backend/routes/booking.js
import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

const router = express.Router();

// Utility: Calculate distance in km
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// POST /api/bookings/allocate
router.post("/allocate", async (req, res) => {
  const { userId, type, from, to, userLat, userLng } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let fare = 0;
    let distanceKm = 0;
    let driver = null;
    let sharers = [];

    if (type === "carpool") {
      // Find other carpool bookings on same route
      sharers = await Booking.find({ from, to, type: "carpool" });
      // Simple fare calculation for demonstration
      fare = 5 * (sharers.length + 1); // ₹5 per person per ride
    } else if (type === "designated") {
      // Find nearest available driver
      driver = await User.findOne({
        type: "driver",
        available: true,
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [userLng, userLat] },
            $maxDistance: 10000, // 10 km
          },
        },
      });

      if (!driver) return res.status(404).json({ message: "No nearby drivers" });

      const [drvLng, drvLat] = driver.location.coordinates;
      distanceKm = getDistanceKm(userLat, userLng, drvLat, drvLng);
      fare = 10 * distanceKm; // ₹10 per km

      driver.available = false;
      await driver.save();
    }

    const booking = await Booking.create({
      user: userId,
      driver: driver ? driver._id : null,
      type,
      from,
      to,
      fare,
      distanceKm,
    });

    res.json({ booking, driver, sharers, distanceKm, fare });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
