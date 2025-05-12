const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

exports.quizController = async (req, res) => {
  try {
    let textContent;

    // Content extraction from URL or file
    if (req.body.contentUrl) {
      try {
        const response = await axios.get(req.body.contentUrl, { responseType: 'arraybuffer' });
        const contentType = response.headers['content-type'];

        if (contentType.includes('application/pdf')) {
          const data = await pdfParse(response.data);
          textContent = data.text;
        } else if (contentType.includes('text/plain')) {
          textContent = response.data.toString();
        } else {
          return res.status(400).json({ error: 'Unsupported URL file type' });
        }
      } catch (error) {
        console.error('URL fetch error:', error);
        return res.status(500).json({ error: 'Failed to fetch URL content' });
      }
    } else if (req.files?.file) {
      const file = req.files.file;
      const allowedTypes = [
        'application/pdf',
        'text/plain',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({ error: 'Unsupported file type' });
      }

      if (file.mimetype === 'application/pdf') {
        const data = await pdfParse(file.data);
        textContent = data.text;
      } else if (file.mimetype === 'text/plain') {
        textContent = file.data.toString();
      } else if (file.mimetype.includes('wordprocessingml')) {
        const result = await mammoth.extractRawText({ buffer: file.data });
        textContent = result.value;
      }
    } else {
      return res.status(400).json({ error: 'No content provided' });
    }

    // Content validation and truncation
    if (!textContent) return res.status(400).json({ error: 'No extractable content' });
    if (textContent.length > 8000) {
      textContent = textContent.substring(0, 8000) + '... [truncated]';
    }

    // Quiz generation with retry logic
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    let quiz;
    let retries = 0;

    while (retries < 3) {
      try {
        const prompt = `Generate a 10-question quiz about OS synchronization in strict JSON format without any markdown or extra characters:
        {
          "quizTitle": "Synchronization Quiz",
          "questions": [
            {
              "type": "multiple_choice",
              "question": "...",
              "options": ["...", "...", "...", "..."],
              "correctAnswer": "...",
              "explanation": "..."
            }
          ]
        }
        Content: ${textContent}
        Important: Use valid JSON only (no markdown).`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = response.text();

        // Clean the response text: remove markdown and unnecessary characters
        const cleanText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();
        
        // Debug the cleaned text for verification
        console.log('Cleaned Generated Text:', cleanText);

        // Attempt to parse the cleaned text as JSON
        try {
          quiz = JSON.parse(cleanText);
        } catch (parseError) {
          console.error('JSON Parsing Error:', parseError.message);
          throw new Error('Invalid JSON format after cleanup');
        }

        // Validate the structure of the quiz
        if (!quiz.questions || !Array.isArray(quiz.questions)) {
          throw new Error('Invalid question array');
        }

        // Filter valid questions
        quiz.questions = quiz.questions.filter(q => {
          const validMC = q.type === 'multiple_choice' && 
                         q.options?.length >= 2 && 
                         q.correctAnswer;
          const validTF = q.type === 'true_false' && 
                         q.correctAnswer;
          return validMC || validTF;
        });

        if (quiz.questions.length >= 3) break;
        throw new Error('Insufficient valid questions');
        
      } catch (error) {
        retries++;
        if (retries >= 3) throw error;
        await new Promise(resolve => setTimeout(resolve, 2000 * retries));
      }
    }

    // Final validation
    if (!quiz || quiz.questions.length < 3) {
      throw new Error('Failed to generate sufficient questions');
    }

    res.json({
      success: true,
      quiz: {
        title: quiz.quizTitle || "OS Synchronization Quiz",
        questions: quiz.questions,
        source: req.body.contentUrl || req.files?.file?.name || 'Direct input'
      }
    });

  } catch (error) {
    console.error('Quiz generation failed:', error);
    res.status(500).json({
      error: 'Quiz generation failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
