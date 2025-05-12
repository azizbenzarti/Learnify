const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    
    // chapter_ids: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Chapter'
    //   }],

    grade: { type: Number, required: true },
    exam_date: { type: Date, required: true },
  
    course_id: {   type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,},

  
  });

  const StudyRequestSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subjects: { type: [subjectSchema], required: true }
  });

module.exports = mongoose.model('StudyRequest', StudyRequestSchema);

