const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },

  created_at: { type: Date, default: Date.now },

  updated_at: { type: Date, default: Date.now },

  description: { type: String, required: false },
});

module.exports = mongoose.model("Course", courseSchema);
