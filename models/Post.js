const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

let Post = mongoose.model("Posts", PostSchema);

module.exports = Post;
