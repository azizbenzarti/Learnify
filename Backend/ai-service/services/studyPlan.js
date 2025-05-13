const StudyPlan = require('../models/studyPlan');
const StudyRequest = require('../models/studyRequest');
const { generateStudyPlan } = require('./geminiService');


async function createStudyPlan(studyRequestId) {
  try {
    if (!studyRequestId) throw new Error('Study request ID is required');


    const existingPlan = await StudyPlan.findOne({ request: studyRequestId });
    if (existingPlan) {
      
     
      return {
        success: false,
        error: 'A study plan already exists for this request',
        existingPlan,
        canRegenerate: !isPlanValid(existingPlan),
      };
    }

    const studyRequest = await StudyRequest.findById(studyRequestId);
    const studentId=studyRequest.student_id;

    if (!studyRequest) throw new Error('Study request not found');
    if (!studyRequest.subjects?.length) throw new Error('No subjects found in the request');

    // Generate raw plan from Gemini or another AI
    const generationResult = await generateStudyPlan(studyRequest);
    if (!generationResult.success) throw new Error(generationResult.error);

    // Transform it into the schema we expect
    const transformedPlan = transformGeminiResponse(
      generationResult.plan || generationResult, // fallback depending on shape
      studyRequestId,
      studentId,
    );

    console.log("transformed", transformedPlan);
    console.log("transformed schedule", transformedPlan.schedule);

    if (!isPlanValid(transformedPlan)) {
      throw new Error('Generated study plan is incomplete');
    }

   let savedPlan = null;
try {
  savedPlan = await StudyPlan.create(transformedPlan);
} catch (creationError) {
  if (creationError.code === 11000) {
    // Duplicate key error — silently fail or return a generic response
    return {
      success: false,
      error: 'A study plan already exists for this request',
      recoverySuggestion: 'You can regenerate or update the existing plan.',
    };
  } else {
    throw creationError; // other errors should still bubble up
  }
}
} catch (error) {
  return {
    success: false,
    error: error.message || 'Unknown error',
    recoverySuggestion: 'Please try again or contact support.',
  };
}
return {
  success: true,
  studyPlan: await StudyPlan.findById(savedPlan._id),
};}



function transformGeminiResponse(geminiData, studyRequestId, studentId) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const weekly = daysOfWeek.map((day) => {
    const rawSessions = geminiData.study_plan?.[day] || [];
    
    const sessions = rawSessions.map((session) => {
      // Parse the time range into start and end times
      const { startTime, endTime } = parseTimeRange(session.time);
      
      return {
        day,
        subject: session.subject || 'Unknown',
        startTime: startTime || '16:00', // Default to 4 PM if not specified
        endTime: endTime || '17:00',    // Default to 5 PM if not specified
        activity: 'Study session',
        technique: session.method || 'Active Recall',
        date: session.date 
      };
    });

    return sessions;
  }).flat(); // Flatten the array of arrays into a single array

  const revisionTimeline = {
    weeksBeforeExam: 2,
    dailyRevisionTime: 60,
  };

  const recommendations = {
    focusAreas: [],
    techniques: [],
    resources: [],
  };

  return {
    request: studyRequestId,
    student_id: studentId,

    schedule: {
      weekly,
      revisionTimeline,
    },
    recommendations,
    notes: '',
  };
}

// Helper function to parse time ranges like "4:00 PM - 5:00 PM"
function parseTimeRange(timeRange) {
  if (!timeRange) return { startTime: '16:00', endTime: '17:00' };
  
  try {
    const [startPart, endPart] = timeRange.split(' - ');
    const startTime = convertTo24HourFormat(startPart.trim());
    const endTime = convertTo24HourFormat(endPart.trim());
    return { startTime, endTime };
  } catch (error) {
    console.error('Failed to parse time range:', error);
    return { startTime: '16:00', endTime: '17:00' };
  }
}

// Helper function to convert "4:00 PM" to "16:00"
function convertTo24HourFormat(timeStr) {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}


async function getStudyPlan(studyPlanId) {
  try {
    const studyPlan = await StudyPlan.findById(studyPlanId);

    if (!studyPlan) throw new Error('Study plan not found');

    return { success: true, studyPlan };
  } catch (error) {
    console.error('Failed to retrieve study plan:', error.message);
    return { success: false, error: error.message };
  }
}




/**
 * Fetch all study plans associated with a student.
 */
async function getStudyPlansByStudent(studentId) {
  try {
    const studyRequests = await StudyRequest.find({ student_id: studentId });
    const requestIds = studyRequests.map(req => req._id);

    const studyPlans = await StudyPlan.find({ request: { $in: requestIds } })

    return { success: true, studyPlans };
  } catch (error) {
    console.error('Failed to fetch study plans for student:', error.message);
    return { success: false, error: error.message };
  }
}

// Helpers

function getDayOfWeek(date) {
  try {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
  } catch {
    return 'Unknown';
  }
}

function validateSubject(subjectName, subjects) {
  const found = subjects.find(s => s.name === subjectName);
  return found ? found.name : subjects[0]?.name || 'General';
}

function buildRecommendations(items, subjects, defaults) {
  if (!Array.isArray(items)) return [];
  return subjects.map(subject => ({
    subject: validateSubject(subject.name, subjects),
    items: defaults,
  }));
}

function isPlanValid(plan) {
  return Array.isArray(plan.schedule?.weekly) && plan.schedule.weekly.length > 0;
}

module.exports = {
  createStudyPlan,
  getStudyPlan,
  getStudyPlansByStudent,
};
