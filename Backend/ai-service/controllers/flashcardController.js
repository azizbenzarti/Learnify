const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const axios = require('axios');

exports.flashcardController = async (req, res) => {
  try {
    let textContent;

    // Check if content is a URL
    if (req.body.contentUrl) {
      const contentUrl = req.body.contentUrl;
      console.log('Fetching content from URL:', contentUrl);

      try {
        const response = await axios.get(contentUrl, { responseType: 'arraybuffer' });
        const contentType = response.headers['content-type'];

        if (contentType.includes('application/pdf')) {
          const data = await pdfParse(response.data);
          textContent = data.text;
          console.log("PDF Text Extracted from URL:", textContent.substring(0, 200) + "...");
        } else if (contentType.includes('text/plain')) {
          textContent = response.data.toString();
          console.log("Text Extracted from URL:", textContent.substring(0, 200) + "...");
        } else {
          return res.status(400).json({ error: 'Unsupported file type from URL' });
        }
      } catch (axiosError) {
        console.error('Error fetching content from URL:', axiosError);
        return res.status(500).json({ error: 'Failed to fetch content from URL' });
      }
    }
    // Use uploaded file if no URL
    else if (req.files?.file) {
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
        console.log("PDF Text Extracted from File:", textContent.substring(0, 200) + "...");

      } else if (file.mimetype === 'text/plain') {
        textContent = file.data.toString();
      } else if (file.mimetype.includes('wordprocessingml')) {
        const result = await mammoth.extractRawText({ buffer: file.data });
        textContent = result.value;
      }
    }
    else {
      return res.status(400).json({ error: 'No file uploaded or URL provided' });
    }

    if (!textContent) {
      return res.status(400).json({ error: 'No content to process' });
    }
    // Generate flashcards (Gemini directly in controller)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    const prompt = `Create flashcards from this content:\n${textContent}\n\nFormat as:\nQ: question\nA: answer`;
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Parse response
    const generatedText = response.text();
    const flashcards = generatedText.split('\n\n').map(item => {
      const [q, a] = item.split('\n');
      return {
        question: q?.replace('Q: ', '').trim(),
        answer: a?.replace('A: ', '').trim(),
      };
    }).filter(card => card.question && card.answer);

    res.json({ flashcards });
  } catch (error) {
    console.error('Flashcard Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate flashcards',
      details: error.errorDetails || null,
    });
  }
};
