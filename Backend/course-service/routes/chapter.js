const express = require("express");
const {
    createChapter,
    getChapters,
    getChapterById,
    updateChapter,
    deleteChapter,
  } = require("../controllers/chapter");

const chapterRouter = express.Router();

chapterRouter.post("/", createChapter);
chapterRouter.get("/", getChapters);
chapterRouter.get("/:id",getChapterById);
chapterRouter.put("/:id", updateChapter);
chapterRouter.delete("/:id", deleteChapter);

module.exports = chapterRouter;
