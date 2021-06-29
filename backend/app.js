const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, PUT, OPTIONS"
  );
  next();
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "1503495laksmd",
      title: "First post",
      content: "First post content",
    },
    {
      id: "askfnas2123",
      title: "First post",
      content: "First post content",
    },
    {
      id: "120398bskjd",
      title: "First post",
      content: "First post content",
    },
    {
      id: "a8s7d6213",
      title: "First post",
      content: "First post content",
    },
  ];
  res.status(200).json({
    message: "Post fetch succesfull",
    posts: posts,
  });
});

module.exports = app;
