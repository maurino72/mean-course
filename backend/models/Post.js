const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
