const Post = require("./Post.js");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = mongoose.Schema({
  id: { type: String },
  createdAt: String,
  username: { type: String, required: true },
  hashed_password: { type: String, required: true },
  exp: Number,
  level: Number,
  listOfTodo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});


module.exports = mongoose.model("User", userSchema);
