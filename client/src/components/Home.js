import React from "react";
import "./Home.css";
import carImage from "../assets/car.png"; // place your car image in src/assets/

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to TripLink</h1>
          <p>
            TripLink connects passengers and drivers safely and efficiently. 
            Share rides or book a professional driver to reach your destination 
            comfortably while saving money and time. Fast, reliable, and safe rides 
            for everyone.
          </p>
        </div>
        <div className="hero-image">
          <img src={carImage} alt="Car illustration" />
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Carpooling</h3>
          <p>A shared transportation service that allows multiple passengers traveling in the same direction to use a single vehicle, reducing costs, traffic, and environmental impact.</p>
        </div>
        <div className="feature-card">
          <h3>Designated Driver</h3>
          <p>A service that provides a professional driver to safely transport you and your vehicle from one location to another when you are unable to drive.</p>
        </div>
        <div className="feature-card">
          <h3>Easy Booking</h3>
          <p>Quickly book rides or drivers using our simple interface.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
