const express = require("express");
const Post = require("./models/Post");
const router = express.Router();

router.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  console.log("mew")
  res.send(posts);
});

router.get("/", (req, res) => {
  res.send("hello");
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch (error) {
    res.status(404);
    res.send({ error: "Post doesn't exist" });
  }
});

router.patch("/posts/:id", async (req, res) => {
  try {
    if (req.body.title) {
      post.title = req.body.title;
    }
    if (req.body.content) {
      post.content = req.body.content;
    }

    await this.post.save();
    res.send(post);
  } catch (error) {
    res.status(404);
    res.send({ error: "Post doesn't exist" });
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (error) {
    res.status(404);
    res.send({ error: "Post doesn't exist" });
  }
});

router.post("/posts", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  await post.save();
  res.send(post);
});

module.exports = router;
