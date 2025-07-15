import React from "react";

import bannerImage from "../assets/banner1.png"; // Chemin relatif au dossier components
import "./Banner.css"; // ✅ Importe le CSS ici

const Banner = () => {
  return (
    <div className="banner">
      <img
        src={bannerImage} // 👈 Pas entre guillemets !
        alt="Codex Arcana Banner"
        className="banner-img"
      />
      <div className="banner-content">
        <h1>Codex Arcana – Rise of the Reptilian Order</h1>
        <p>Unlock the Secrets of the Ancients</p>
        <div className="banner-buttons">
          <button>Learn More</button>
          <button>Enter the Arena</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
