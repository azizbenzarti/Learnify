require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUploadMiddleware = require("./middleware/fileUpload");

const chatRoutes = require("./routes/chat");
const flashcardRoutes = require("./routes/flashcards");
const summaryRoutes = require("./routes/summaryRoutes");
const assistantRoutes = require("./routes/assistantRoutes");
const recommendationsRouter = require("./routes/recommendations");
const quizRoutes = require("./routes/quiz");
const studyRequestRouter = require("./routes/studyRequest");
const studyPlanRouter = require("./routes/studyPlan");

require("./configs/connectDb");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(fileUploadMiddleware);

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/generate-flashcards", flashcardRoutes);
app.use("/api/recommendations", recommendationsRouter);
app.use("/api/summary", summaryRoutes);
app.use("/api/assistant", assistantRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/", studyRequestRouter);
app.use("/studyplan", studyPlanRouter);

// Root route
app.get("/", (req, res) => {
  res.send("AI Services Backend is running!");
});

// 404 Handler (Must be last!)
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Start the server
app.listen(PORT, (error) => {
  if (error) {
    console.log("Server Failed to Start");
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
