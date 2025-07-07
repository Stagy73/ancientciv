// middleware/verifyToken.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token manquant." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajoute les infos du token dans req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide ou expiré." });
  }
};
