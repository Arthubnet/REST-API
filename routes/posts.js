const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
const Post = require("../models/Post");

//create a post
router.post("/", async (req, res) => {
  try {
    let post = new Post(req.body);
    post = await post.save();
    res.status(200).json({
      status: 200,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});

//list of posts
router.get("/", async (req, res) => {
  try {
    let posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
});

//get specific post
router.get("/:postID", async (req, res) => {
  let post = await Post.findById(req.params.postID);
  res.json(post);
});

//delete a post
router.delete("/:postID", async (req, res) => {
  const removePost = await Post.remove({ _id: req.params.postID });
  res.json(removePost);
});

//update a post
router.patch("/:postId", async (req, res) => {
  try {
    let updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (error) {
    res.json(error);
  }
});

/* router.get("/next-page", (req, res) => {
  res.send("gonna be /posts/next-page ");
}); */

module.exports = router;
