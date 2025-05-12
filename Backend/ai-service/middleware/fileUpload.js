const fileUpload = require('express-fileupload');

const fileUploadMiddleware = fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB files
  abortOnLimit: true,
});

module.exports = fileUploadMiddleware;
