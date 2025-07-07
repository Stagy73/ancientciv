import React from "react";

const StatsPanel = ({ stats }) => {
  return (
    <div className="stats-panel">
      <p>🜂 Influence : {stats.influence}</p>
      <p>🜁 Conscience : {stats.conscience}</p>
      <p>🜄 Origine : {stats.origine}</p>
    </div>
  );
};

export default StatsPanel;
