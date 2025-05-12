const express = require("express");
const router = express.Router();

const{
    createStudyRequest,
    

} = require("../controllers/studyRequest");

const authenticate=require("../../user-service/middlewares/auth");

router.post("/studyrequest",authenticate ,createStudyRequest);


module.exports = router;
