import { useState } from "react";
import axios from "axios";

export default function DriverSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [licenseNo, setLicenseNo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
  name,
  email,
  password,
  type: "driver",
  licenseNo,
});
console.log(response.data); // now it's being used

      alert("Driver registered successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response.data.message || "Error signing up");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Driver Sign Up</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input placeholder="License No" value={licenseNo} onChange={(e) => setLicenseNo(e.target.value)} required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
