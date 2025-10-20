// client/src/pages/Signup.js
import React, { useState } from "react";
import "../styles/Auth.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("user");
  const [license, setLicense] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, password, type, license });
    setMessage("✅ Thanks for signing up! You can now log in and book your ride.");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>User Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="user">User</option>
            <option value="driver">Driver</option>
          </select>

          {type === "driver" && (
            <>
              <label>License Number</label>
              <input
                type="text"
                placeholder="Enter your license number"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                required
              />
            </>
          )}

          <button type="submit">Sign Up</button>
        </form>
        {message && <p className="success-msg">{message}</p>}
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
