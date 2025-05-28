const Services = require("../models/service.model.js");
const Booking = require("../models/booking.model.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");

const addService = async (req, res) => {
  try {
    const { title, description, price, duration } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }
    if (!price) {
      return res.status(400).json({ message: "Price is required" });
    }
    if (!duration) {
      return res.status(400).json({ message: "Duration is required" });
    }

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
     // Emit real-time update to all clients
     global.io.emit('new-service', service);

    res
      .status(201)
      .json({ message: "Products Added Successfully ... ", data: service });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const services = await Services.find({}).skip(skip).limit(limit);
    res
      .status(200)
      .json({ message: "Services Retrieved Successfully...", data: services });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Services.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service Not Found" });
    }
    res
      .status(200)
      .json({ message: "Service Retrieved Successfully...", data: service });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Services.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: "Service Not Found" });
    }
  
     
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Services.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!service) {
      return res.status(404).json({ message: "Service Not Found" });
    }
    res
      .status(200)
      .json({ message: "Service updated successfully..", data: service });
  } catch (error) {}
};

const bookService = async (req, res) => {
  try {
    const { name, email, price, mode, serviceId } = req.body;
    const service = await Services.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service Not Found" });
    }
    const booking = new Booking({
      name,
      email,
      price,
      mode,
      serviceId,
    });
    const result = await booking.save();
    res
      .status(200)
      .json({ message: "Service booked successfully...", data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

 

module.exports = {
  addService,
  getServices,
  getServiceById,
  deleteService,
  updateService,
  bookService,
};
