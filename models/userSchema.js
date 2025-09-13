const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "L'adresse e-mail doit être valide ex: exemple@domaine.com .",
    ],
  },
  password: {
    type: String,
    required: true,
    minlegth: 8,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task", // Référence vers le modèle Task
    },
  ],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
