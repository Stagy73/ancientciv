// frontend/src/pages/game/SelectRace.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/game.css";

const races = ["Anunnaki", "Reptilien", "Hybride", "Atlante"];

const SelectRace = () => {
  const navigate = useNavigate();

  const handleSelect = (race) => {
    localStorage.setItem("selectedRace", race);
    navigate("/game/arena");
  };

  return (
    <div className="select-race-container">
      <h1>🧬 Choisis ta Race</h1>
      <div className="race-buttons">
        {races.map((race) => (
          <button key={race} onClick={() => handleSelect(race)}>
            {race}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectRace;
