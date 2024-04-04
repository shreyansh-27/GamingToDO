const mongoose = require("mongoose");

const schema = mongoose.schema(
  {
    title: String,
    content: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", schema);
