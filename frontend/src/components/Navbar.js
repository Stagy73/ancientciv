import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className="navbar"
      style={{
        background: "#111",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
        position: "relative", // pour le z-index
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/home" style={{ color: "#fff", textDecoration: "none" }}>
          🏠 Accueil
        </Link>
        <Link to="/game" style={{ color: "#fff", textDecoration: "none" }}>
          🕹️ Jeu
        </Link>
        <Link to="/browse" style={{ color: "#fff", textDecoration: "none" }}>
          👁️ Voir les profils
        </Link>
        <Link to="/arena">⚔️ Arène</Link>
      </div>

      <button
        onClick={logout}
        style={{
          background: "#a100ff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
        }}
      >
        Déconnexion
      </button>
    </nav>
  );
};

export default Navbar;
