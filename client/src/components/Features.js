import React from "react";

const features = [
  {
    img: "https://img.icons8.com/ios-filled/100/1a73e8/car--v1.png",
    title: "Carpooling",
    desc: "Save money and the environment by sharing rides with people going your way."
  },
  {
    img: "https://img.icons8.com/ios-filled/100/1a73e8/steering-wheel.png",
    title: "Designated Driver",
    desc: "Book a professional driver to drive your car safely when you can't drive yourself."
  },
  {
    img: "https://img.icons8.com/ios-filled/100/1a73e8/location.png",
    title: "Easy Booking",
    desc: "Quickly book rides or drivers with our simple, intuitive app interface."
  }
];

const Features = () => {
  return (
    <section id="features" style={styles.section}>
      {features.map((f, index) => (
        <div key={index} style={styles.card}>
          <img src={f.img} alt={f.title} style={styles.img} />
          <h3 style={styles.title}>{f.title}</h3>
          <p style={styles.desc}>{f.desc}</p>
        </div>
      ))}
    </section>
  );
};

const styles = {
  section: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "40px",
    padding: "80px 10%",
    backgroundColor: "#f9f9f9"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    flex: "1 1 300px",
    transition: "transform 0.3s, box-shadow 0.3s"
  },
  img: {
    width: "80px",
    marginBottom: "20px"
  },
  title: {
    fontSize: "24px",
    marginBottom: "15px",
    color: "#1a73e8"
  },
  desc: {
    fontSize: "16px",
    color: "#555"
  }
};

export default Features;
