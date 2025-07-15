const express = require("express");
const router = express.Router();
const ArenaScore = require("../models/ArenaScore");
const verifyToken = require("../middleware/verifyToken");

// 📝 Add or update points
router.post("/score", verifyToken, async (req, res) => {
  const { points } = req.body;
  try {
    const updatedScore = await ArenaScore.findOneAndUpdate(
      { userId: req.user.id },
      { $inc: { points }, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    res.json(updatedScore);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update score" });
  }
});

// 📝 Get user score
router.get("/score", verifyToken, async (req, res) => {
  try {
    const score = await ArenaScore.findOne({ userId: req.user.id });
    res.json(score || { points: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch score" });
  }
});

module.exports = router;
