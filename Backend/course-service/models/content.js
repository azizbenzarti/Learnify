const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  chapter: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Chapter",  
    required: true 
  },

  type: { 
    type: String, 
    enum: ["video", "text", "file"], 
    required: false 
  },

  data: { 
    type: String,
    required: true 
  },

  fileType: {
    type: String, 
    required: false 
  },

  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Content", contentSchema);
