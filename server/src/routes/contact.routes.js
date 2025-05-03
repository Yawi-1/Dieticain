const router = require("express").Router();
const {
  createContact,
  updateContact,
  getContacts,
} = require("../controllers/contact.controllers");
router.get("/", getContacts);
router.post("/", createContact);
router.put("/:id", updateContact);

module.exports = router;
