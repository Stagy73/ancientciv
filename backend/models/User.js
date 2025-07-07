const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String },
  googleId: { type: String },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date },
});

module.exports = mongoose.model("User", UserSchema);
