const {
  uploadFileToCloudinary,
  saveContentToDatabase,
} = require("../services/content");

const contentService = require("../services/content");

const uploadContent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const { fileUrl, fileType } = await uploadFileToCloudinary(req.file.path);

    // Save content details in database
    const newContent = await saveContentToDatabase(
      fileUrl,
      fileType,
      req.body.chapter
    );

    console.log("Content saved to DB:", newContent);

    res.status(201).json({content:newContent});
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllContent = async (req, res) => {
  try {
    const content = await contentService.getAllContent();
    res.status(200).json({contents:content});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
};

const getContentById = async (req, res) => {
  try {
    const foundContent = await Content.findById(req.params.id)
      .populate("chapter") // Populate the chapter
      .populate({
        path: "chapter",
        populate: { path: "course" }, // Populate the course within the chapter
      });

    if (!foundContent) return res.status(404).json({ error: "Content not found" });

    res.status(200).json({content:foundContent});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
};

const deleteContent = async (req, res) => {
  try {
    await contentService.deleteContent(req.params.id);
    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadContent,
  getAllContent,
  getContentById,
  deleteContent,
};
