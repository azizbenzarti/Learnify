const mongoose = require("mongoose");


const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  
  progress: {
    type: Number, 
    default: 0,
  },

  grade:{
    type: Number, 
    default: 100,

  },

  passed: {
    type: Boolean,
    default: false,
  },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;
