const bcrypt = require("bcryptjs");
const saltRounds = 10;
const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const jwtSecret = "f4r3nfio34nf94329f3299238FS";
var cookieParser = require("cookie-parser");

router.use(cookieParser());

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Generate salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash password
    const hash = await bcrypt.hash(password, salt);

    // Create user in the database
    const user = await User.create({
      username: username,
      hashed_password: hash,
      salt: salt,
      exp: 0,
      level: 1,
    });

    // Respond with the newly created user or a success message
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passOk = await bcrypt.compare(password, user.hashed_password);
    if (!passOk) {
      return res.status(401).json({ message: "Invalid password" });
    }

    jwt.sign(
      { username: user.username, id: user._id },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(user);
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { username, _id } = await User.findById(userData.id);
      res.json({ username, _id });
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").send("Logout successful");
});

module.exports = router;
