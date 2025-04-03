const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configs/cloudinary"); 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let resourceType = "auto"; 
   
    return {
   
      resource_type: resourceType, 
      allowed_formats: ["jpg", "jpeg", "png", "gif", "pdf", "pptx", "mp4"], 
      access_mode: "public",
    };
  },
});

const upload = multer({ storage: storage }).single("file");

module.exports = upload;
