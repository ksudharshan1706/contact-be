const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const contactRoutes = require("./routes/contact.js");

dotenv.config();
const app = express();

const ConnectDb = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => console.log("db connection error"));
};
app.use(express.json());
app.use(cors());

//routes
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  ConnectDb();
  console.log(`Sever listening to ${PORT}`);
});
