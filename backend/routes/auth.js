// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

// ✅ Utilise bien la clé secrète du .env
const generateToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// 🟢 Inscription
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email déjà utilisé." });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    console.error("Erreur register:", err);
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
});

// 🟢 Connexion classique
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    console.error("Erreur login:", err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// 🟢 Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🟢 Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = generateToken(req.user);
    // ✅ Redirige avec token dans l’URL pour traitement côté React
    res.redirect(`http://localhost:3000/google-redirect?token=${token}`);
  }
);

module.exports = router;
