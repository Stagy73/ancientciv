// ─────────────────────────────────────────────────────────────
// 🌐 IMPORTS & CONFIGS
// ─────────────────────────────────────────────────────────────

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config(); // 🔥 Required for .env variables

const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const arenaRoutes = require("./routes/arena");

require("./config/passport")(passport);

const app = express();

// ─────────────────────────────────────────────────────────────
// 🔗 MIDDLEWARES
// ─────────────────────────────────────────────────────────────

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET || "codex_arcana_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ─────────────────────────────────────────────────────────────
// 🗄️  DATABASE CONNECTION
// ─────────────────────────────────────────────────────────────

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ─────────────────────────────────────────────────────────────
// 🛣️  ROUTES
// ─────────────────────────────────────────────────────────────

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/api/arena", arenaRoutes); // ✅ Arena routes for points tracking
app.use("/uploads", express.static("uploads")); // Access uploaded files

console.log("✅ All routes loaded");

// ─────────────────────────────────────────────────────────────
// 🚀 SERVER START
// ─────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
