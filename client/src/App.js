import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages
import Home from "./components/Home";
import Contact from "./components/Contact";
import DriverList from "./components/DriverList";
import Booking from "./components/Booking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./index.css";

function App() {
  return (
    <Router>
      {/* Header */}
      <header className="header">
        <h1>TripLink</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/drivers">Drivers</Link>
          <Link to="/book">Book Now</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drivers" element={<DriverList />} />
        <Route path="/book" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
