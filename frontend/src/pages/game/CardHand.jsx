import React from "react";
import Card from "./CardComponent";
import "./CardHand";

// 🔍 Fonction pour regrouper les cartes par catégorie (origine)
const groupCardsByCategory = (cards, niveau) => {
  const categories = {
    Personnages: [],
    Artefacts: [],
    Pouvoirs: [],
    Événements: [],
    Lieux: [],
  };

  cards.forEach((card) => {
    const origine = card.stats.origine.toLowerCase();

    if (origine.includes("atlante") && niveau < 10) return;

    if (
      origine.includes("anunnaki") ||
      origine.includes("reptilien") ||
      origine.includes("hybride") ||
      origine.includes("atlante")
    ) {
      categories.Personnages.push(card);
    } else if (origine.includes("artefact")) {
      categories.Artefacts.push(card);
    } else if (origine.includes("pouvoir")) {
      categories.Pouvoirs.push(card);
    } else if (origine.includes("evenement") || origine.includes("événement")) {
      categories.Événements.push(card);
    } else if (origine.includes("lieu")) {
      categories.Lieux.push(card);
    }
  });

  return categories;
};

// 🎴 Composant principal
const CardHand = ({ cards, animating, niveau, filtre }) => {
  const grouped = groupCardsByCategory(cards, niveau);

  const filteredCategories =
    filtre === "Toutes" ? grouped : { [filtre]: grouped[filtre] || [] };

  return (
    <div className={`card-hand ${animating ? "animating" : ""}`}>
      <div className="card-grid">
        {Object.entries(filteredCategories).map(
          ([category, cards]) =>
            cards.length > 0 && (
              <div key={category} className="card-category">
                <h2>{category}</h2>
                <div className="card-row">
                  {cards.map((card, index) => (
                    <Card key={index} card={card} />
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default CardHand;
