import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2025 Poolify. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#1a73e8",
    color: "#fff",
    textAlign: "center",
    padding: "40px 10%",
    marginTop: "50px"
  }
};

export default Footer;
