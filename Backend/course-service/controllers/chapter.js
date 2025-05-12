const ChapterService = require("../services/chapter");

const createChapter = async (req, res) => {
  try {
    const chapter = await ChapterService.createChapter(req.body);
    res.status(201).json(chapter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getChapters = async (req, res) => {
  try {
    const chapters = await ChapterService.getChapters();
    res.status(200).json({chapters:chapters});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChapterById = async (req, res) => {
  try {
    const foundChapter = await ChapterService.getChapterById(req.params.id);
    if (!foundChapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    res.status(200).json({chapter:foundChapter});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateChapter = async (req, res) => {
  try {
    const updatedChapter = await ChapterService.updateChapter(req.params.id, req.body);
    if (!updatedChapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    res.status(200).json({chapter:updatedChapter});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteChapter = async (req, res) => {
  try {
    const chapter = await ChapterService.deleteChapter(req.params.id);
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createChapter,
  getChapters,
  getChapterById,
  updateChapter,
  deleteChapter,
};
