const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

const app = express();

// Load environment variables
dotenv.config();

// Middleware to parse JSON
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true ,  methods: ['GET']
}));

console.log("CORS enabled for:", process.env.FRONTEND_URL);



// Connect to the database
require('./configs/connectDb.js');

// Define port with a fallback
const port = process.env.PORT ;

// Use routes
const enrollmentRouter= require("./routes/enrollment.js");
app.use("/", enrollmentRouter);



// Start the server
app.listen(port, (error) => {
    if (error) {
        console.log("Server Failed");
    } else {
        console.log(`Server is running on port ${port}`);
    }
});
