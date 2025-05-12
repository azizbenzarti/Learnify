const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const pdfParse = require('pdf-parse');
const axios = require('axios');
const express = require('express');

const app = express();

exports.summaryController = async (req, res) => {
  let textContent = null;

  try {
    console.log('Request received with content-type:', req.headers['content-type']);

    // 1. Handle JSON (raw text)
    if (req.headers['content-type']?.includes('application/json')) {
      if (req.body.text) {
        textContent = req.body.text;
        console.log('Received raw text content:', textContent.substring(0, 100) + '...');
      } else {
        return res.status(400).json({ error: 'No text provided in JSON body' });
      }
    }
    // 2. Handle file upload (form-data) with express-fileupload
    else if (req.files && req.files.file) { // Access file through req.files.file
      const file = req.files.file;

      console.log('Received file:', file.name, 'Mimetype:', file.mimetype);

      if (file.mimetype === 'application/pdf') {
        const data = await pdfParse(file.data);
        textContent = data.text;
      } else if (file.mimetype === 'text/plain') {
        textContent = file.data.toString();
      } else {
        return res.status(400).json({ error: 'Unsupported file type' });
      }
    }
    else {
      return res.status(400).json({ error: 'No content provided' });
    }

    // 3. Validate content
    if (!textContent || textContent.trim().length < 50) {
      return res.status(400).json({
        error: 'Content too short for summarization',
        minimumLength: 50,
        providedLength: textContent?.length || 0,
      });
    }

    // 4. Generate summary
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    const prompt = `Create a comprehensive 3-paragraph summary of the following content, focusing on key points and main ideas:\n\n${textContent}`;
    const result = await model.generateContent(prompt);
    const summary = (await result.response.text()).trim();

    res.json({
      success: true,
      summary,
      inputLength: textContent.length,
    });

  } catch (error) {
    console.error('Summary generation error:', error);
    res.status(500).json({
      error: 'Failed to generate summary',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
