const cloudinary = require("../config/cloudinary");

/**
 * Uploads a PDF file to Cloudinary.
 * @param {string} base64String - The base64 encoded string of the PDF file.
 * @returns {Promise<string>} - The secure URL of the uploaded file.
 * @throws {Error} - Throws an error if the file format is not a valid PDF.
 */
const uploadPdfToCloudinary = async (base64String) => {
  // Validate if it's a base64 PDF
  if (!base64String.startsWith("data:application/pdf")) {
    throw {
      status: 400,
      error: "Invalid CV format. Must be a base64-encoded PDF.",
    };
  }

  try {
    const uploadedCv = await cloudinary.uploader.upload(base64String, {
      resource_type: "raw", // Ensures Cloudinary treats it as a file, not an image
      folder: "tutors/cvs",
      format: "pdf", // Ensures the uploaded file is treated as a PDF
    });
    return uploadedCv.secure_url;
  } catch (error) {
    throw { status: 500, error: "Cloudinary upload failed", details: error };
  }
};

module.exports = uploadPdfToCloudinary;
