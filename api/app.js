require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.js");
const bodyParser = require("body-parser");
const Post = require("./models/Post.js");
const postRoute = require("./routes/postRoutes.js");
const userRoute = require("./routes/userRoutes.js");
const cors = require("cors");

const mongoString = process.env.MONGO_URI;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/users", (req, res) => {
  const users = Post.find({});
  res.send(users);
});

app.get("/api/:user", (req, res) => {
  res.send(Post.findOne({ _id: req.params.user }));
});

app.use("/posts", postRoute);
app.use("/auth", authRouter);
app.use("/user", userRoute);

mongoose
  .connect(mongoString)
  .then(() => {
    console.log("Connected to the db");
    app.listen(3000, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
