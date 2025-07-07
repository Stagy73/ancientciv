// src/game/data/cards.js
export async function loadAllCards() {
  const origins = [
    "anunnaki",
    "anunnaki_rebelle",
    "atlante",
    "reptilien",
    "hybride",
    "artefact",
    "pouvoir",
    "evenement",
    "lieux",
  ];

  const allCards = [];

  for (const origin of origins) {
    try {
      const response = await fetch(`/data/cards/${origin}.json`);
      if (!response.ok) {
        console.warn(`Erreur chargement: ${origin}.json`);
        continue;
      }

      const cards = await response.json();
      allCards.push(...cards);
    } catch (err) {
      console.error(`Erreur parsing JSON pour ${origin}:`, err);
    }
  }

  return allCards;
}

export async function loadRandomHand() {
  const allCards = await loadAllCards();
  return allCards.sort(() => 0.5 - Math.random()).slice(0, 10);
}
