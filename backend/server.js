const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");
require("dotenv").config(); // 🔥 Indispensable !

require("./config/passport")(passport);

const app = express();
app.use(cors());
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

// ✅ Connexion à MongoDB Atlas (pas localhost)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/auth", authRoutes);
const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
