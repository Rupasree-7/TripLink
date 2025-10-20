import React, { useState, useEffect } from "react";
import "./Booking.css";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/bookings"; // backend API

function Booking() {
  const [type, setType] = useState("carpool");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null });
  const [result, setResult] = useState(null);

  // Get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      type,
      from: from || `Lat:${currentLocation.lat},Lng:${currentLocation.lng}`,
      to,
      userLat: currentLocation.lat,
      userLng: currentLocation.lng
    };

    try {
      const response = await axios.post(`${API_BASE}/allocate`, payload);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setResult({ error: err.response?.data?.message || "Something went wrong" });
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h2>Book Your Ride</h2>
        <p className="sub-title">Fast, safe, and convenient rides for everyone</p>

        <div className="ride-type-selection">
          <button
            className={type === "carpool" ? "active" : ""}
            onClick={() => setType("carpool")}
          >
            Carpool
          </button>
          <button
            className={type === "designated" ? "active" : ""}
            onClick={() => setType("designated")}
          >
            Designated Driver
          </button>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Pickup Location"
          />
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Destination"
            required
          />
          <button type="submit">Confirm Ride</button>
        </form>

        {result && (
          <div className="booking-result">
            {result.error && <p className="error">{result.error}</p>}

            {type === "carpool" && result.sharers && (
              <>
                <h3>Sharers Found:</h3>
                <p>Fare: ₹{result.fare}</p>
                <ul>
                  {result.sharers.map((s) => (
                    <li key={s._id}>
                      User: {s.user} | From: {s.from} | To: {s.to}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {type === "designated" && result.driver && (
              <>
                <h3>Driver Allocated:</h3>
                <p>Name: {result.driver.name}</p>
                <p>Distance: {result.distanceKm} km</p>
                <p>Fare: ₹{result.fare}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;
