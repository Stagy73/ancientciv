const applyPower = (card, opponent) => {
  let modifiedCard = { ...card };
  let modifiedOpponent = { ...opponent };

  const power = card.power?.toLowerCase() || "";

  // 🧠 Exemples de pouvoirs simples

  if (power.includes("assassinat")) {
    if (opponent.stats.conscience < 3) {
      modifiedCard.stats.influence += 99; // effet "one-shot"
    }
  }

  if (power.includes("bonus contre reptilien")) {
    if (opponent.stats.origine.toLowerCase().includes("reptilien")) {
      modifiedCard.stats.influence += 2;
    }
  }

  if (power.includes("protection divine")) {
    modifiedCard.stats.conscience += 1;
  }

  if (power.includes("vol d’énergie")) {
    modifiedCard.stats.influence += 1;
    modifiedOpponent.stats.influence = Math.max(
      0,
      opponent.stats.influence - 1
    );
  }

  return { modifiedCard, modifiedOpponent };
};
