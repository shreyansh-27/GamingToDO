const express = require("express");
const router = express.Router();
const Note = require("../models/Note.js");
const User = require("../models/User.js");

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const notes = [];
      const list = user.listOfNote;
      console.log("what: " + user);
      try {
        for (const noteId of list) {
          const note = await Note.findById(noteId);
          notes.push(note);
        }
        notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return res.status(200).send(notes);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:userId", async (req, res) => {
  const userId = req.params.userId;

  const note = new Note({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const user = User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      try {
        const newNote = await Note.create(note);
        if (newNote) {
          const updateUser = await User.findByIdAndUpdate(userId, {
            $push: { listOfNote: note },
          });
        }
        res.send(note);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
