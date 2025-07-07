import React from "react";
import Card from "./CardComponent";

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

    // 💡 Blocage des cartes Atlantes si niveau < 10
    if (origine.includes("atlante") && niveau < 10) return;

    if (
      origine.includes("anunnaki") ||
      origine.includes("reptilien") ||
      origine.includes("hybride") ||
      origine.includes("atlante")
    ) {
      categories.Personnages.push(card);
    } else if (origine === "artefact") {
      categories.Artefacts.push(card);
    } else if (origine === "pouvoir") {
      categories.Pouvoirs.push(card);
    } else if (origine === "evenement" || origine === "événement") {
      categories.Événements.push(card);
    } else if (origine === "lieu" || origine === "lieux") {
      categories.Lieux.push(card);
    }
  });

  return categories;
};

// 🎴 Composant principal
const CardHand = ({ cards, animating, niveau, filtre }) => {
  const grouped = groupCardsByCategory(cards, niveau);

  // Ne garder que la catégorie sélectionnée si un filtre est appliqué
  const filteredCategories =
    filtre === "Toutes" ? grouped : { [filtre]: grouped[filtre] || [] };

  return (
    <div className={`card-hand ${animating ? "animating" : ""}`}>
      {Object.entries(filteredCategories).map(([category, cards]) => (
        <div key={category} className="card-category">
          <h2>{category}</h2>
          <div className="card-row">
            {cards.length > 0 ? (
              cards.map((card, index) => <Card key={index} card={card} />)
            ) : (
              <p className="empty-category">Aucune carte</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardHand;
