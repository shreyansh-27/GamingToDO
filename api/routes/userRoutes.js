const express = require("express");
const router = express.Router();
const Post = require("../models/Post.js");
const User = require("../models/User.js");

router.get("/:userId", async (req, res) => {
  const id = req.params.userId;
  console.log(req.params);

  try {
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const { exp, level } = user;
    res.send({ exp, level });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
