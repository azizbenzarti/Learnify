const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

// Load environment variables
dotenv.config();

// Middleware to parse JSON
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true 
}));




// Connect to the database
require('./configs/connectDb.js');

// Define port with a fallback
const port = process.env.PORT ;

// Use routes
const studyRequestRouter = require("./routes/studyRequest.js");
app.use("/", studyRequestRouter);

const studyPlanRouter = require("./routes/studyPlan.js");
app.use("/studyplan", studyPlanRouter);



// Start the server
app.listen(port, (error) => {
    if (error) {
        console.log("Server Failed");
    } else {
        console.log(`Server is running on port ${port}`);
    }
});
