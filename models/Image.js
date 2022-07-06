const mongoose = require("mongoose");

const ImagesSchema = mongoose.Schema({ id: String }, { strict: false });

let Images = mongoose.model("Images", ImagesSchema);

module.exports = Images;
