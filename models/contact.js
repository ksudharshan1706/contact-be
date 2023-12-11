const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  phoneno: {
    type: String,
    require: true,
    unique: true,
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
