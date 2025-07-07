import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page">
      <h1>Bienvenue sur Codex Arcana</h1>
      <Link to="/login">Se connecter</Link> | <Link to="/register">Créer un compte</Link> | <Link to="/game">Jouer</Link>
    </div>
  );
};

export default Home;
