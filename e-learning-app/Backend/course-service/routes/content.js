const express = require('express');

const contentRouter = express.Router();

const upload = require('../middleware/upload.js');
const { 
    uploadContent,
    getAllContent,
     getContentById,deleteContent
     } = require('../controllers/content');

     contentRouter.post('/', upload, uploadContent);
     contentRouter.get('/', getAllContent);
     contentRouter.get('/:id', getContentById);
     contentRouter.delete('/:id', deleteContent);



module.exports = contentRouter;

