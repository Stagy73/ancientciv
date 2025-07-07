// Add to backend/server.js or routes/cards.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const sampleCards = [
  {
    id: 1,
    name: 'Lilith, Soul Whisperer',
    influence: 9,
    power: 7,
    divinity: 10,
    lore: 'Rebelle primordiale contre Enlil.'
  },
  {
    id: 2,
    name: 'Enki the Architect',
    influence: 8,
    power: 5,
    divinity: 9,
    lore: 'Créateur génétique de l’humanité.'
  }
];

router.get('/cards', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'jwt_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    res.json(sampleCards);
  });
});

module.exports = router;
