const mongoose = require("mongoose");

const ImagesSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

let Images = mongoose.model("Images", ImagesSchema);

module.exports = Images;
