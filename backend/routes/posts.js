const express = require("express");
const Post = require("../models/Post");
const routes = express.Router();
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime Type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + extension);
  },
});

routes.post("", multer(storage).single("image"), (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((result) => {
    res.status(201).json({
      message: "Post added",
      postId: result._id,
    });
  });
});

routes.get("", (req, res, next) => {
  Post.find().then((results) => {
    res.status(200).json({
      message: "Post fetch succesfull",
      posts: results,
    });
  });
});

routes.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Post deleted",
    });
  });
});

routes.put("/:id", (req, res, next) => {
  const newPost = {
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  };

  Post.updateOne({ _id: req.params.id }, newPost).then((response) => {
    res.status(200).json({
      message: "Post updated",
    });
  });
});

routes.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (!post) {
      res.status(404).json({
        message: "Post not Found",
      });
    }

    res.status(200).json(post);
  });
});

module.exports = routes;
