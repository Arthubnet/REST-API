const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");

const port = process.env.PORT || 3000;

//parsing anyime we got request to the server
app.use(bodyParser.json());

//cors
app.use(cors());

let UNSPLASH_KEY = process.env.UNSPLASH_KEY;

//middlewear
app.use("/new-image/:query", async (req, res) => {
  let response = await fetch(
    `https://api.unsplash.com/photos/random?query=${req.params.query}&client_id=${UNSPLASH_KEY}`
  ).then((data) => data.json());

  res.json(response);
});

// import routes
const imagesRoute = require("./routes/images");
app.use("/images", imagesRoute);

//routes
/* app.get("/", (req, res) => {
  res.send("This is home");
});
 */
//Connect to DB
mongoose.connect(`${process.env.DB_CONNECTION}`, () => {
  console.log("connected to DB");
});

//listening the server
app.listen(port);
