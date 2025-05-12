const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const pdfParse = require('pdf-parse');
const axios = require('axios');

exports.assistantController = async (req, res) => {
    try {
        const { question } = req.body;
        let textContent = null;

        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        console.log('Request received with content-type:', req.headers['content-type']);

        // 1. Handle JSON (raw text)
        if (req.headers['content-type']?.includes('application/json')) {
            if (req.body.text) {
                textContent = req.body.text;
                console.log('Received raw text content:', textContent.substring(0, 100) + '...');
            } else if (req.body.contentUrl) {
                // Handle content URL
                try {
                    const response = await axios.get(req.body.contentUrl, { responseType: 'arraybuffer' });
                    const contentType = response.headers['content-type'];
                    
                    if (contentType.includes('application/pdf')) {
                        const data = await pdfParse(response.data);
                        textContent = data.text;
                    } else if (contentType.includes('text/plain')) {
                        textContent = response.data.toString();
                    } else {
                        return res.status(400).json({ error: 'Unsupported file type from URL' });
                    }
                } catch (urlError) {
                    console.error('Error fetching content from URL:', urlError);
                    return res.status(500).json({ error: 'Failed to fetch content from URL' });
                }
            }
        }
        // 2. Handle file upload (form-data) with express-fileupload
        else if (req.files && req.files.file) {
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

        // 3. Validate content (if provided - not required for general questions)
        if (textContent && textContent.trim().length < 50) {
            return res.status(400).json({
                error: 'Content too short for meaningful context',
                minimumLength: 50,
                providedLength: textContent?.length || 0,
            });
        }

        // 4. Generate answer
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
        
        let prompt;
        if (textContent) {
            prompt = `Context:\n${textContent}\n\nQuestion: ${question}\n\nPlease answer the question based on the provided context:`;
        } else {
            prompt = `Question: ${question}\n\nAnswer:`;
        }

        const result = await model.generateContent(prompt);
        const answer = (await result.response.text()).trim();

        res.json({
            success: true,
            answer,
            contextLength: textContent?.length || 0,
            sources: textContent ? ['Provided content'] : ['General knowledge']
        });

    } catch (error) {
        console.error('Assistant error:', error);
        res.status(500).json({
            error: 'Failed to generate answer',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
};