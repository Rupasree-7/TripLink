import React, { useEffect, useState } from "react";

import "../index.css";
// src/api.js
export const API_BASE = "http://localhost:5000/api";


function DriverList() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const res = await fetch(`${API_BASE}/drivers`); // adjust endpoint if needed
        if (!res.ok) throw new Error("Failed to fetch drivers");
        const data = await res.json();
        setDrivers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDrivers();
  }, []);

  if (loading) return <p>Loading drivers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <section className="drivers-list">
      <h2>Available Drivers</h2>
      <div className="driver-cards">
        {drivers.map((driver) => (
          <div key={driver._id} className="driver-card">
            <h3>{driver.name}</h3>
            <p>Vehicle: {driver.vehicle || "N/A"}</p>
            <p>Seats: {driver.seats || "N/A"}</p>
            <p>Location: {driver.location || "N/A"}</p>
            <p>Rating: {driver.rating || 5} ⭐</p>
            <p>Status: {driver.available ? "Available" : "Busy"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DriverList;
