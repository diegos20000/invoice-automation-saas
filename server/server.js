const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const uploadRoute = require("./routes/upload");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/upload", uploadRoute);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});