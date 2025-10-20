import { useState } from "react";
import axios from "axios";

export default function DriverLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("driverToken", data.token);
      alert("Logged in successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response.data.message || "Error logging in");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Driver Login</h2>
      <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}
