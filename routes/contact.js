const Contact = require("../models/contact");

const router = require("express").Router();

//get all contacts
router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//add a new contact
router.post("/", async (req, res) => {
  const { name, phoneno } = req.body;
  try {
    const contact = await Contact.findOne({ name });
    if (contact) {
      res.status(409).json("contact name already present!! give a new name");
    } else {
      const contactno = await Contact.findOne({ phoneno });
      if (contactno) {
        res.status(409).json("contact already present with different name");
      } else {
        const newContact = new Contact({ ...req.body });
        const savedcontact = await newContact.save();
        res.status(200).json(savedcontact);
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//add a new contact
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const updatedcontact = await Contact.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updatedcontact);
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete contact
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const updatedcontact = await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
