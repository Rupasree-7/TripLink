// client/src/pages/BookingPage.js
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "../styles/BookingPage.css";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const BookingPage = () => {
  const [type, setType] = useState("carpool");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState([51.515, -0.1]); // default destination
  const [currentLocation, setCurrentLocation] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = [position.coords.latitude, position.coords.longitude];
      setCurrentLocation(coords);
      setFrom(coords); // Pickup = current location
    });
  }, []);

  const handleBooking = () => {
    if (type === "carpool") {
      setStatusMessage(
        "Searching for passengers nearby who are ready to share your ride. We’ll update you once a match is found."
      );
    } else if (type === "designated") {
      setStatusMessage(
        "Allocating a driver near your location. Driver details will be shared with you shortly for a safe journey."
      );
    }
  };

  // Optional custom car icon
  const carIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + "/car.png", // place car.png inside public folder
    iconSize: [32, 32],
  });

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h2>Book Your Ride</h2>

        <div className="ride-type-selection">
          <button
            onClick={() => setType("carpool")}
            className={type === "carpool" ? "active" : ""}
          >
            Carpool
          </button>
          <button
            onClick={() => setType("designated")}
            className={type === "designated" ? "active" : ""}
          >
            Designated Driver
          </button>
        </div>

        {currentLocation && from && (
          <MapContainer
            center={currentLocation}
            zoom={13}
            style={{ height: "300px", width: "100%", margin: "1rem 0", borderRadius: "10px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={currentLocation}>
              <Popup>Your Location</Popup>
            </Marker>
            <Marker position={from} icon={carIcon}>
              <Popup>Pickup</Popup>
            </Marker>
            <Marker position={to} icon={carIcon}>
              <Popup>Destination</Popup>
            </Marker>
          </MapContainer>
        )}

        <button className="confirm-btn" onClick={handleBooking}>
          Confirm Ride
        </button>

        {statusMessage && <p className="status-msg">{statusMessage}</p>}
      </div>
    </div>
  );
};

export default BookingPage;
