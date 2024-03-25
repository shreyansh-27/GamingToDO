const express = require("express");
const router = express.Router();
const Post = require("../models/Post.js");
const User = require("../models/User.js");

router.get("/:userId", async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "No post found" });
    } else {
      const todos = [];
      const list = user.listOfTodo;

      try {
        for (const todoId of list) {
          const todo = await Post.findById(todoId);
          todos.push(todo);
        }
        todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return res.status(200).send(todos);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:userId", async (req, res) => {
  const id = req.params.userId;
  console.log(req.body);
  const post = new Post({
    content: req.body.content,
    difficulty: req.body.difficulty,
  });
  try {
    const savedPost = await Post.create(post);
    const user = await User.findByIdAndUpdate(id, {
      $push: { listOfTodo: post },
    });
    res.send(post);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:userId/:id", async (req, res) => {
  const { id, userId } = req.params;
  const { content, difficulty } = req.body;

  try {
    console.log("difficulty: " + difficulty);
    const result = await Post.findByIdAndUpdate(id, {
      content: content,
      difficulty: difficulty,
    });
    if (!result) {
      console.log("Item not found");
    } else {
      console.log("Item updated");
      res.send({ content, difficulty });
    }
  } catch (error) {
    console.log(error);
  }
  console.log(id, userId, content);
});

router.delete("/:userId/:id/:difficulty", async (req, res) => {
  const { id, userId, difficulty } = req.params;

  const difficultyMap = {
    easy: 1,
    medium: 2,
    hard: 3,
  };

  function calculateExpVsLevel(lvl, exp) {
    let constantNumber = 1.8;
    let map = new Map();
    for (let i = 1; i < 100; i++) {
      // console.log(i + 1 +" : " + Math.pow((i/.5), constantNumber));
      map.set(i, Math.round(Math.pow(i / 0.5, constantNumber)));
    }
    const newLvl = exp > map.get(lvl) ? lvl + 1 : lvl;
    console.log(lvl, exp, newLvl);
    return newLvl;
  }

  const diff = difficultyMap[difficulty] || 0;

  try {
    try {
      const userProfile = await User.findById(userId);
      const currentExp = userProfile.exp;
      const updatedExp = currentExp + diff;
      const currentLvl = userProfile.level;
      const updatedLevel = calculateExpVsLevel(currentLvl, updatedExp);
      console.log("New level" + updatedLevel);

      const exp = await User.findByIdAndUpdate(userId, {
        $set: { exp: updatedExp, level: updatedLevel },
      });
    } catch (error) {
      console.log(error);
    }

    const result = await Post.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(userId, {
      $pull: { listOfTodo: id },
    });

    if (!result) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user was found and the update was successful
    if (user) {
      return res.status(200).json({ message: "Post deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
