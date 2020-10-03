const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
app.use(express.json());

mongoose.connect(
  config.get("MONGODB_URI"),
  { useNewUrlParser: true, useCreateIndex: true },
  () => {
    console.log("MongoDB Connected");
  }
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

const port = config.get("PORT") || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port} `);
});
