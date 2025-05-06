const Contact = require("../models/contact.model");

const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    global.io.emit("new-contact", newContact); 
    res
      .status(201)
      .json({ message: "Contact created successfully", data: newContact });
  } catch (error) {
    res.status(500).json({ message: "Error creating contact", error });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res
      .status(200)
      .json({ data: contacts, message: "Contacts fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body)
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, 
    });
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res
      .status(200)
      .json({ message: "Contact updated successfully", data: updatedContact });
  } catch (error) {
    res.status(500).json({ message: "Error updating contact", error });
  }
};

module.exports = {
  createContact,
  updateContact,
  getContacts,
};
