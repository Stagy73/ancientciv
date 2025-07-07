import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/game.css";
import CardHand from "./game/CardHand";
import StoryText from "./game/StoryText";
import StatsPanel from "./game/StatsPanel";
import { loadAllCards } from "./game/data/cards";

const Game = () => {
  const [hand, setHand] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [niveau, setNiveau] = useState(1); // Niveau du joueur
  const [filtre, setFiltre] = useState("Toutes"); // ⬅️ Nouveau filtre

  const [stats] = useState({
    influence: 5,
    conscience: 3,
    origine: "Hybride",
  });

  useEffect(() => {
    const fetchCards = async () => {
      const cards = await loadAllCards();
      setAllCards(cards);
      setHand(cards); // Affiche tout au début
    };
    fetchCards();
  }, []);

  const dealNewHand = () => {
    setAnimating(true);
    setTimeout(() => {
      const newHand = allCards.sort(() => 0.5 - Math.random()).slice(0, 10);
      setHand(newHand);
      setAnimating(false);
    }, 800);
  };

  const handleFiltreChange = (e) => {
    setFiltre(e.target.value);
  };

  return (
    <div className="game-container">
      <Navbar />

      {/* 🔮 Fond animé */}
      <div className="mystic-background">
        <div className="mystic-smoke"></div>
      </div>

      <div className="game-page">
        <h1>Partie en cours</h1>
        <p>Niveau du joueur : {niveau}</p>

        <StatsPanel stats={stats} />
        <StoryText />

        <div style={{ margin: "20px 0" }}>
          <label htmlFor="filtre">Filtrer par catégorie :</label>{" "}
          <select value={filtre} onChange={handleFiltreChange}>
            <option value="Toutes">Toutes</option>
            <option value="Personnages">Personnages</option>
            <option value="Artefacts">Artefacts</option>
            <option value="Pouvoirs">Pouvoirs</option>
            <option value="Événements">Événements</option>
            <option value="Lieux">Lieux</option>
          </select>
        </div>

        <button onClick={dealNewHand} className="deal-button">
          🎲 Distribuer une main aléatoire
        </button>

        <CardHand
          cards={hand}
          animating={animating}
          niveau={niveau}
          filtre={filtre}
        />

        <div className="logo-container">
          <img src="/logo512.png" alt="Codex Arcana" />
        </div>
      </div>
    </div>
  );
};

export default Game;
