// models/StudyPlan.js
const mongoose = require('mongoose');

const studySessionSchema = new mongoose.Schema({
  day: { 
    type: String, 
    required: true, 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] 
  },
  startTime: { type: String, required: true }, // Format: "HH:MM"
  endTime: { type: String, required: true },
  subject: { type: String, required: true },
  activity: { type: String, required: false, default: 'Study session' },
  technique: { type: String },
  date: {type:String ,default :Date.now} 
});

const StudyPlanSchema = new mongoose.Schema({
  // Single reference to the original request
  request: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'StudyRequest',
    required: true,
    unique: true // Ensures one plan per request
  },
  
  // Generated content
  schedule: {
    weekly: [studySessionSchema],
    revisionTimeline: {
      weeksBeforeExam: { type: Number },
      dailyRevisionTime: { type: Number } // in minutes
    }
  },
  
  recommendations: {
    focusAreas: [{ subject: String, topics: [String] }],
    techniques: [{ subject: String, methods: [String] }],
    resources: [{ subject: String, links: [String] }]
  },

  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Metadata
  generatedAt: { type: Date, default: Date.now }
}, { timestamps: true });



module.exports = mongoose.model('StudyPlan', StudyPlanSchema);
