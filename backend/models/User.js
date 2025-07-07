const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String },
  username: { type: String },
  description: { type: String },
  profilePic: { type: String },
  points: { type: Number, default: 0 },
  history: { type: [String], default: [] },
  googleId: { type: String }, // si tu utilises Google OAuth
});

module.exports = mongoose.model("User", UserSchema);
