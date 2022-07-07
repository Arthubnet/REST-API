const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const port = process.env.PORT || 3000;

//parsing anyime we got request to the server
app.use(bodyParser.json());

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//middlewear
app.use("/new-image/:query", async (req, res) => {
  let response = await fetch(
    `https://api.unsplash.com/photos/random?query=${req.params.query}&client_id=${process.env.REACT_APP_UNSPLASH_KEY}`
  ).then((data) => data.json());

  res.json(response);
});

// import routes
const imagesRoute = require("./routes/images");
app.use("/images", imagesRoute);

//routes
app.get("/", (req, res) => {
  res.send("This is home");
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("connected to DB");
});

//listening the server
app.listen(port);
