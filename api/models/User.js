const Post = require("./Post.js");
const Note = require("./Note.js");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: { type: String },
  createdAt: String,
  username: { type: String, required: true },
  hashed_password: { type: String, required: true },
  exp: Number,
  level: Number,
  listOfTodo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  listOfNote: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
});

module.exports = mongoose.model("User", userSchema);
