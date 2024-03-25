const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    content: String,
    difficulty: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", schema);
