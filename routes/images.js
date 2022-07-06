const express = require("express");
/* const { restart } = require("nodemon"); */
const router = express.Router();
const Image = require("../models/Image");

//create a post
router.post("/", async (req, res) => {
  try {
    let image = new Image(req.body);
    image = await image.save();
    res.status(200).json({
      status: 200,
      data: image,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});

//list of images
router.get("/", async (req, res) => {
  try {
    let images = await Image.find();
    res.json(images);
  } catch (err) {
    console.log(err);
  }
});

//get specific image
router.get("/:imageID", async (req, res) => {
  let image = await Image.findById(req.params.imageID);
  res.json(image);
});

//delete a image
router.delete("/:imageID", async (req, res) => {
  const removeimage = await Image.remove({ _id: req.params.imageID });
  res.json(removeimage);
});

//update a image
router.patch("/:imageId", async (req, res) => {
  try {
    let updatedimage = await Image.updateOne(
      { _id: req.params.imageId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedimage);
  } catch (error) {
    res.json(error);
  }
});

/* router.get("/next-page", (req, res) => {
  res.send("gonna be /images/next-page ");
}); */

module.exports = router;
