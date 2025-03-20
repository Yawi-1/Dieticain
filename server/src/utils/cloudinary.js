const cloudinary = require("cloudinary");
const fs = require('fs')
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const uploadOnCloudinary = async (file) => {
  try {
    if (!file || !file.path) {
      console.log("No file uploaded");
      return null;
    }

    const response = await cloudinary.uploader.upload(file.path, {
      resource_type: "image",
    });
    fs.unlinkSync(file.path);

    return response.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
  }
};


module.exports = uploadOnCloudinary