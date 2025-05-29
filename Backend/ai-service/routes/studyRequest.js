const express = require("express");
const router = express.Router();

const{
    createStudyRequest,
    

} = require("../controllers/studyRequest");

//const authenticate = require("../../user-service/middlewares/auth"); // for development setup
const authenticate = require('../middlewares/auth'); // for docker setup


router.post("/studyrequest",authenticate ,createStudyRequest);


module.exports = router;
