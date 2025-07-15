// ✅ Codex Arcana — Game.jsx (Sélecteur de Main)

import React, { useEffect, useState } from "react";

import "../styles/game.css";
import CardHand from "./game/CardHand";
import { loadAllCards } from "./game/data/cards";

const Game = () => {
  const [allCards, setAllCards] = useState([]);
  const [selectedHand, setSelectedHand] = useState([]);
  const [randomHand, setRandomHand] = useState([]);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      const cards = await loadAllCards();
      setAllCards(cards);
    };
    fetchCards();
  }, []);

  const toggleSelectCard = (card) => {
    if (selectedHand.includes(card)) {
      setSelectedHand(selectedHand.filter((c) => c !== card));
    } else {
      if (selectedHand.length < 10) {
        setSelectedHand([...selectedHand, card]);
      } else {
        alert("Tu ne peux choisir que 10 cartes maximum");
      }
    }
  };

  const dealRandomHand = () => {
    setAnimating(true);
    setTimeout(() => {
      const shuffled = [...allCards].sort(() => 0.5 - Math.random());
      const random = shuffled.slice(0, 10);
      setRandomHand(random);
      setSelectedHand(random);
      setAnimating(false);
    }, 500);
  };

  const saveHand = () => {
    if (selectedHand.length !== 10) {
      alert("Ta main doit contenir exactement 10 cartes");
      return;
    }
    localStorage.setItem("selectedHand", JSON.stringify(selectedHand));
    alert("✅ Main sauvegardée ! Prêt pour l'Arène !");
  };

  return (
    <div className="game-container">
      <div className="game-page">
        <h1>🎴 Sélectionne ta main de combat</h1>

        <button onClick={dealRandomHand} className="deal-button">
          🎲 Distribuer une main aléatoire
        </button>

        <button
          onClick={saveHand}
          className="deal-button"
          style={{ marginLeft: 10 }}
        >
          💾 Valider cette main
        </button>

        <button
          onClick={() => (window.location.href = "/arena")}
          className="deal-button"
          style={{ marginLeft: 10 }}
        >
          ⚔️ Combattre dans l’Arène
        </button>

        <div style={{ marginTop: 20 }}>
          <h3>🃏 Sélection actuelle ({selectedHand.length}/10)</h3>
          <div className="card-row">
            {allCards.map((card, i) => (
              <div
                key={i}
                onClick={() => toggleSelectCard(card)}
                style={{
                  border: selectedHand.includes(card)
                    ? "2px solid gold"
                    : "2px solid transparent",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <CardHand
                  cards={[card]}
                  animating={animating}
                  niveau={1}
                  filtre={"Toutes"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
