const Services = require("../models/service.model.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");

const addService = async (req, res) => {
  try {
    const { title, description, price, duration } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }
    const imageUrl = await uploadOnCloudinary(file);
    const service = await Services.create({
      title,
      description,
      price,
      duration,
      image: imageUrl || file?.path,
    });

    res
      .status(201)
      .json({ message: "Products Added Successfully ... ", data: service });
    console.log(service);
  } catch (error) {
    console.log(error);
  }
};

const getServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
   const services =  await Services.find({}).skip(skip).limit(limit);
   res.status(200).json({ message: "Services Retrieved Successfully...", data: services });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { addService,getServices };
