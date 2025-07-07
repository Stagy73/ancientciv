import React from "react";

const CardComponents = ({ card }) => {
  return (
    <div
      className="card"
      style={{
        background: "#1b0f2b",
        color: "#eee",
        border: "1px solid #444",
        borderRadius: "12px",
        padding: "16px",
        margin: "10px",
        width: "250px",
        fontFamily: "'Cinzel', serif",
      }}
    >
      {/* Si image disponible, l'afficher, sinon un bloc placeholder */}
      {card.image ? (
        <img src={card.image} alt={card.name} className="card-img" />
      ) : (
        <div
          style={{
            background: "#333",
            height: "150px",
            borderRadius: "8px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1em",
            color: "#777",
          }}
        >
          Image manquante
        </div>
      )}

      <h3>{card.name}</h3>
      <p style={{ fontSize: "0.9em", marginTop: "4px" }}>{card.description}</p>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "8px" }}>
        <li>🜂 Influence: {card.stats.influence}</li>
        <li>🜁 Conscience: {card.stats.conscience}</li>
        <li>🜄 Origine: {card.stats.origine}</li>
      </ul>
      <p style={{ marginTop: "8px", fontStyle: "italic" }}>
        <strong>Pouvoir :</strong> {card.power}
      </p>
    </div>
  );
};

export default CardComponents;
