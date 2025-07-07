// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", backgroundColor: "#222", color: "#fff" }}>
      <button onClick={handleLogout}>Déconnexion</button>
    </nav>
  );
};

export default Navbar;
