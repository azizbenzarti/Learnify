const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

exports.chatController = async (req, res) => {
  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    const result = await model.generateContent(message);
    const response = await result.response;

    res.json({ reply: response.text() });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({
      error: error.message || 'AI processing failed',
      details: error.errorDetails || null,
    });
  }
};
