const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log("GEMINI_API_KEY", GEMINI_API_KEY);
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-exp-03-25:generateContent?key=${GEMINI_API_KEY}`;
// const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;


exports.generateStudyPlan = async (studyRequest) => {
  try {
    if (!studyRequest?.subjects?.length) {
      throw new Error('Invalid study request: missing subjects data');
    }

    // Sort subjects by grade (lowest first)
    const sortedSubjects = [...studyRequest.subjects].sort((a, b) => a.grade - b.grade);

    const prompt = `
You are an expert academic planner.

Given the following study request, create a comprehensive study plan that:
- Prioritizes subjects with the **lowest grade** first.
- Allocates study time from **4 PM on weekdays** and **10 AM on weekends**.
- Includes regular **breaks** after every 45-60 minutes of study.
- Suggests **proven study methods** for each subject (e.g. Pomodoro, active recall, mind mapping, etc.).
- Balances subjects across the week.
-the study plan should start 1 **week** starting from **exam_date**.
-the year is 2025

Here is the study request (prioritized by weakest subjects first):
${JSON.stringify({ ...studyRequest, subjects: sortedSubjects }, null, 2)}

Return the study plan in the following JSON format:
{
  "study_plan": {
    "Monday": [{ "time": "4:00 PM - 5:00 PM", "subject": "Math", "method": "Active Recall", date:"01-04-2025","break": "5 mins" }, ...],
    ...
    "Sunday": [{ "time": "10:00 AM - 11:00 AM", "subject": "History", "method": "Pomodoro",date:"07-04-2025 "break": "10 mins" }]
  }
}
`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        responseMimeType: "application/json"
      }
    };

    const response = await axios.post(GEMINI_API_URL, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 150000
    });

    const text = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("Gemini response missing expected content");
    }
    console.log("Gemini response text:", text);

    const jsonString = text.replace(/```json|```/g, '').trim();
    const parsedResponse = JSON.parse(jsonString);

    console.log("Parsed response:", parsedResponse.study_plan);

    return {
      success: true,
      generated_at: new Date().toISOString(),
      study_plan: parsedResponse.study_plan,
    };

  } catch (error) {
    console.error('Study plan generation failed:', {
      error: error.message,
      timestamp: new Date().toISOString()
    });

    return {
      success: false,
      error: error.message,
      recovery_suggestion: "Please check your input data and try again with clearer requirements"
    };
  }
};
