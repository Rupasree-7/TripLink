import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Poolify</h1>
      <nav>
        <a href="#features" style={styles.link}>Features</a>
        <a href="#book" style={styles.link}>Book Now</a>
        <a href="#contact" style={styles.link}>Contact</a>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 10%",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },
  title: {
    color: "#1a73e8",
    fontSize: "28px"
  },
  link: {
    marginLeft: "25px",
    fontWeight: "500",
    textDecoration: "none",
    color: "#333"
  }
};

export default Header;
