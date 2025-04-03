const express = require("express");
const connectDb = require("./configs/connectDb");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Load environment variables
dotenv.config();



// Connect to the database
connectDb();

// Define port with a fallback
const port = process.env.PORT ;

// Use routes
const contentRouter= require("./routes/content.js");
const courseRouter= require("./routes/course.js");
const chapterRouter= require("./routes/chapter.js");

app.use("/content", contentRouter);
app.use("/course", courseRouter);
app.use("/chapter", chapterRouter);


// Start the server
app.listen(port, (error) => {
    if (error) {
        console.log("Server Failed");
    } else {
        console.log(`Server is running on port ${port}`);
    }
});
