const Chapter = require("../models/Chapter");

const createChapter = async (chapterData) => {
  return await Chapter.create(chapterData);
};

const getChapters = async () => {
  return await Chapter.find().populate("course", "name");
};

const getChapterById = async (chapterId) => {
  return await Chapter.findById(chapterId).populate("course", "name");
};

const updateChapter = async (chapterId, chapterData) => {
  return await Chapter.findByIdAndUpdate(chapterId, chapterData, {
    new: true,
    runValidators: true,
  });
};

const deleteChapter = async (chapterId) => {
  return await Chapter.findByIdAndDelete(chapterId);
};

module.exports = {
  createChapter,
  getChapters,
  getChapterById,
  updateChapter,
  deleteChapter,
};
