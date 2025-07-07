import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import CardComponent from "./CardComponent";
import { loadAllCards } from "./data/cards";
import "../../styles/game.css";

// 💥 Pouvoirs simples
const applyPower = (source, target) => {
  const modifiedTarget = { ...target };
  const modifiedSource = { ...source };
  const power = source.power?.toLowerCase();

  if (power?.includes("affaiblit")) {
    modifiedTarget.stats.influence = Math.max(0, target.stats.influence - 2);
  }
  if (power?.includes("boost")) {
    modifiedSource.stats.influence += 2;
  }

  return { modifiedCard: modifiedSource, modifiedOpponent: modifiedTarget };
};

const compareCards = (card1, card2) => {
  const { modifiedCard: c1 } = applyPower(card1, card2);
  const { modifiedCard: c2 } = applyPower(card2, card1);

  const total1 = c1.stats.influence + c1.stats.conscience;
  const total2 = c2.stats.influence + c2.stats.conscience;

  if (total1 > total2) return "player";
  if (total2 > total1) return "bot";
  return "draw";
};

const Arena = () => {
  const [playerHand, setPlayerHand] = useState([]);
  const [botHand, setBotHand] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [round, setRound] = useState(1);
  const [message, setMessage] = useState("");
  const [botPair, setBotPair] = useState([]);
  const [selectedPair, setSelectedPair] = useState([]);
  const [score, setScore] = useState({ player: 0, bot: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [playerRace, setPlayerRace] = useState("Hybride");

  // 🧠 Chargement de la race depuis le localStorage
  useEffect(() => {
    const storedRace = localStorage.getItem("selectedRace") || "Hybride";
    setPlayerRace(storedRace);
    setupGame(storedRace);
  }, []);

  // 🔁 Fonction de setup du jeu (appelée au lancement ou relance)
  const setupGame = async (race) => {
    const allCards = await loadAllCards();
    const shuffled = [...allCards].sort(() => 0.5 - Math.random());

    const playerCharacter = allCards.find(
      (c) => c.stats.origine.toLowerCase() === race.toLowerCase()
    );

    const playerRest = shuffled
      .filter((c) => c !== playerCharacter)
      .slice(0, 9);
    const botCards = shuffled.slice(10, 20);

    setPlayerHand([playerCharacter, ...playerRest]);
    setBotHand(botCards);
    setRound(1);
    setScore({ player: 0, bot: 0 });
    setSelectedIndexes([]);
    setBotPair([]);
    setSelectedPair([]);
    setMessage("");
    setGameOver(false);
  };

  // 🔘 Sélection de 2 cartes par tour
  const handleCardClick = (index) => {
    if (gameOver || selectedIndexes.includes(index)) return;

    const newSelection = [...selectedIndexes, index];
    setSelectedIndexes(newSelection);

    if (newSelection.length === 2) {
      const [i1, i2] = newSelection;
      const card1 = playerHand[i1];
      const card2 = playerHand[i2];
      const botCards = botHand.slice(0, 2);

      setSelectedPair([card1, card2]);
      setBotPair(botCards);

      const score1 = compareCards(card1, botCards[0]);
      const score2 = compareCards(card2, botCards[1]);

      let playerWins = 0;
      let botWins = 0;

      if (score1 === "player") playerWins++;
      if (score2 === "player") playerWins++;
      if (score1 === "bot") botWins++;
      if (score2 === "bot") botWins++;

      if (playerWins > botWins) {
        setMessage("✅ Tu gagnes ce tour !");
        setScore((prev) => ({ ...prev, player: prev.player + 1 }));
      } else if (botWins > playerWins) {
        setMessage("🤖 Le robot gagne ce tour !");
        setScore((prev) => ({ ...prev, bot: prev.bot + 1 }));
      } else {
        setMessage("⚖️ Égalité !");
      }

      setTimeout(() => {
        const newPlayerHand = playerHand.filter((_, i) => i !== i1 && i !== i2);
        const newBotHand = botHand.slice(2);

        setPlayerHand(newPlayerHand);
        setBotHand(newBotHand);
        setSelectedIndexes([]);
        setRound((r) => r + 1);

        if (round >= 5) {
          setGameOver(true);
          setMessage((prev) => {
            if (score.player > score.bot) return prev + " 🏆 Victoire finale !";
            if (score.bot > score.player) return prev + " 💀 Défaite...";
            return prev + " 🤝 Match nul !";
          });
        }
      }, 1500);
    }
  };

  return (
    <div className="game-container">
      <Navbar />

      <div className="game-page">
        <h1>⚔️ Arène de Combat</h1>
        <p>Race sélectionnée : {playerRace}</p>
        <p>Tour {Math.min(round, 5)} / 5</p>
        <p>{message}</p>

        <div className="scoreboard">
          <p>🧙‍♂️ Toi : {score.player}</p>
          <p>🤖 Bot : {score.bot}</p>
        </div>

        <div className="arena-battle">
          {selectedPair.map((card, i) => (
            <CardComponent key={i} card={card} />
          ))}
          {selectedPair.length === 2 && (
            <span style={{ fontSize: "2em", margin: "0 20px" }}>VS</span>
          )}
          {botPair.map((card, i) => (
            <CardComponent key={i} card={card} />
          ))}
        </div>

        {!gameOver && (
          <>
            <h2>🃏 Ta main</h2>
            <div className="card-row">
              {playerHand.map((card, i) => (
                <div
                  key={i}
                  onClick={() => handleCardClick(i)}
                  style={{
                    border: selectedIndexes.includes(i)
                      ? "2px solid gold"
                      : "2px solid transparent",
                    borderRadius: "10px",
                  }}
                >
                  <CardComponent card={card} />
                </div>
              ))}
            </div>
          </>
        )}

        {gameOver && (
          <button
            className="deal-button"
            style={{ marginTop: 20 }}
            onClick={() => setupGame(playerRace)}
          >
            🔄 Rejouer avec {playerRace}
          </button>
        )}
      </div>
    </div>
  );
};

export default Arena;
