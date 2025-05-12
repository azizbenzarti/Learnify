const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-1.5-pro-latest';

async function isValidToken(token) {
  // Implement proper JWT validation
  try {
    return true; // Simplified for example
  } catch (err) {
    return false;
  }
}

exports.generateRecommendations = async (req, res) => {
  try {
    const { studentId } = req.params;
    const authToken = req.headers.authorization?.split(' ')[1];

    if (!studentId || !authToken) {
      return res.status(400).json({ error: 'Missing student ID or authorization' });
    }

    if (!/^[a-f\d]{24}$/i.test(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID format' });
    }

    if (!(await isValidToken(authToken))) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const [coursesRes, chaptersRes] = await Promise.all([
      axios.get(`${process.env.COURSE_SERVICE_URL}/course`, {
        params: { limit: 1000 },
        headers: { Authorization: `Bearer ${authToken}` },
        timeout: 5000
      }),
      axios.get(`${process.env.COURSE_SERVICE_URL}/chapter`, {
        params: { limit: 1000 },
        headers: { Authorization: `Bearer ${authToken}` },
        timeout: 5000
      })
    ]);

    const courses = coursesRes.data.courses || [];
    const chapters = chaptersRes.data.chapters || [];

    const studyContext = {
      courses: courses.map(c => ({ id: c._id, title: c.title })),
      chapters: chapters.map(ch => ({
        id: ch._id,
        title: ch.title,
        courseId: ch.courseId,
        difficulty: ch.difficulty
      }))
    };

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    const prompt = `
      Generate exactly 3 concise study recommendations based on these courses/chapters.
      Format each recommendation EXACTLY like this (no variations):
      "Review [topic] using [method] to improve [skill]"
      
      Courses: ${studyContext.courses.map(c => c.title).join(', ')}
      Chapters: ${studyContext.chapters.map(ch => ch.title).join(', ')}
      
      Requirements:
      - Only output 3 recommendations
      - Each must be one short sentence
      - No numbering, bullet points, or extra text
      - No explanations or notes
      - Focus on practical skills
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract exactly 3 recommendations
    const recommendations = text
      .split('\n')
      .map(line => line.replace(/^[\d\-\*\.\•]+\s*/, '').trim())
      .filter(line => line.length > 0 && 
             !line.toLowerCase().includes('disclaimer') &&
             line.startsWith('Review'))
      .slice(0, 3); // Take only first 3

    if (recommendations.length < 3) {
      // Fallback recommendations if AI didn't provide enough
      const fallbacks = [
        "Review basic algebra using practice problems to improve problem-solving skills",
        "Study organic chemistry concepts using flashcards to improve memorization",
        "Practice programming algorithms using coding challenges to improve technical skills"
      ];
      recommendations.push(...fallbacks.slice(0, 3 - recommendations.length));
    }

    res.json({
      success: true,
      title: "Study Recommendations",
      icon: "📚",
      recommendations
    });

  } catch (error) {
    console.error('Recommendation error:', error);

    if (error.response) {
      return res.status(502).json({ 
        error: 'Upstream service error',
        service: error.config.url
      });
    }

    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({ error: 'Service timeout' });
    }

    res.status(500).json({
      error: 'Failed to generate recommendations',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};