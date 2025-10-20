import React from "react";

const Hero = () => {
  return (
    <section style={styles.hero}>
      <h2 style={styles.title}>Safe & Smart Rides Anytime</h2>
      <p style={styles.desc}>
        Share rides with Poolify or book a designated driver to drive your car safely when you can't.
      </p>
      <button style={styles.button}>Get Started</button>
    </section>
  );
};

const styles = {
  hero: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "100px 10%",
    background: "linear-gradient(to right, #1a73e8, #4285f4)",
    color: "#fff"
  },
  title: {
    fontSize: "48px",
    marginBottom: "20px"
  },
  desc: {
    fontSize: "20px",
    marginBottom: "30px"
  },
  button: {
    padding: "15px 35px",
    backgroundColor: "#fff",
    color: "#1a73e8",
    fontSize: "18px",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: 500
  }
};

export default Hero;
