const cloudinary = require("../configs/cloudinary.js");
const Content = require("../models/content.js");

const uploadFileToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      upload_preset: "ml_default",
    });

    if (!result.secure_url) {
      throw new Error("Upload successful but no secure URL returned.");
    }

    return {
      fileUrl: result.secure_url,
      fileType: result.format,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error(`Failed to upload file to Cloudinary: ${error.message}`);
  }
};

const saveContentToDatabase = async (fileUrl, fileType, chapter) => {
  try {
    const content = new Content({
      data: fileUrl,
      fileType: fileType,
      chapter: chapter,
    });

    await content.save();
    return content;
  } catch (error) {
    console.error("Database Save Error:", error);
    throw new Error("Failed to save content to database");
  }
};
const getAllContent = async () => {
  return await Content.find().populate("chapter");
};

const getContentById = async (contentId) => {
  return await Content.findById(contentId).populate("chapter");
};

const deleteContent = async (contentId) => {
  const content = await Content.findById(contentId);
  if (!content) throw new Error("Content not found");

  // Extract public_id from Cloudinary URL
  const publicId = content.data.split("/").pop().split(".")[0];

  // Delete file from Cloudinary
  await cloudinary.uploader.destroy(`uploads/${publicId}`);

  // Delete content from MongoDB
  return await Content.findByIdAndDelete(contentId);
};

module.exports = {
  uploadFileToCloudinary,
  saveContentToDatabase,
  getAllContent,
  getContentById,
  deleteContent,
};
