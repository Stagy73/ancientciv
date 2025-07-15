// ─────────────────────────────────────────────────────────────────────────────
// 🛡️  IMPORTS & MIDDLEWARES
// ─────────────────────────────────────────────────────────────────────────────

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ArenaScore = require("../models/ArenaScore");
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const path = require("path");

// ─────────────────────────────────────────────────────────────────────────────
// 🔒 PASSWORD SECURITY FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

const isStrongPassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
};

// ─────────────────────────────────────────────────────────────────────────────
// 👤 USER REGISTRATION
// ─────────────────────────────────────────────────────────────────────────────

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  if (!isStrongPassword(password)) {
    return res.status(400).json({ error: "Mot de passe trop faible" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email déjà utilisé" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
  } catch (err) {
    console.error("❌ Erreur inscription:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 🔑 USER LOGIN
// ─────────────────────────────────────────────────────────────────────────────

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Email ou mot de passe incorrect" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ error: "Email ou mot de passe incorrect" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "jwt_secret_key",
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (err) {
    console.error("❌ Erreur connexion:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 👤 GET USER PROFILE
// ─────────────────────────────────────────────────────────────────────────────

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    console.error("❌ Erreur profil:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 🖼️ UPDATE USER PROFILE + UPLOAD PICTURE
// ─────────────────────────────────────────────────────────────────────────────

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.put(
  "/profile",
  verifyToken,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const updateFields = {
        username: req.body.username,
        description: req.body.description,
      };

      if (req.file) updateFields.profilePic = `/uploads/${req.file.filename}`;

      const user = await User.findByIdAndUpdate(req.user.id, updateFields, {
        new: true,
      }).select("-password");

      res.json(user);
    } catch (err) {
      console.error("❌ Erreur mise à jour profil:", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour du profil." });
    }
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// 📊 GET ALL USERS WITH ARENA POINTS
// ─────────────────────────────────────────────────────────────────────────────

router.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const usersWithPoints = await Promise.all(
      users.map(async (user) => {
        const score = await ArenaScore.findOne({ userId: user._id });
        return {
          ...user.toObject(),
          points: score ? score.points : 0,
        };
      })
    );

    res.json(usersWithPoints);
  } catch (err) {
    console.error("❌ Erreur récupération utilisateurs:", err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs." });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// ✅ EXPORT ROUTER
// ─────────────────────────────────────────────────────────────────────────────

module.exports = router;
