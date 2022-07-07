const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");
/* const Image = require("./models/Image"); */

const port = process.env.PORT || 3000;

//parsing anyime we got request to the server
app.use(bodyParser.json());

//cors
app.use(cors());

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
  res.send("THis is home");
  /*     try {
      let images = await Image.find();
      res.json(images);
    } catch (err) {
      console.log(err);
    } */
});

//Connect to DB
mongoose.connect(
  "mongodb+srv://zotig:zotig123@cluster0.xhyse.mongodb.net/images?retryWrites=true&w=majority",
  () => {
    console.log("connected to DB");
  }
);

//listening the server
app.listen(port);
