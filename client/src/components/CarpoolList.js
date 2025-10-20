import React, { useEffect, useState } from "react";
import api from "../api";

const CarpoolList = () => {
  const [carpools, setCarpools] = useState([]);

  useEffect(() => {
    api.get("/carpools").then((res) => setCarpools(res.data));
  }, []);

  return (
    <div>
      <h2>Available Carpools</h2>
      {carpools.map((c) => (
        <div key={c._id}>
          <p>
            {c.origin} → {c.destination} | Seats: {c.seatsAvailable} | ₹
            {c.pricePerSeat}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CarpoolList;
