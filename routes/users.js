const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../jwtMiddleware");
require("dotenv").config();

const User = require("../models/User");

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) res.json({ msg: "User already exists" });
  });

  const newUser = new User({
    name: name,
    email: email,
    password: password,
  });

  // Create salt & hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        // jwt
        jwt.sign(
          { id: user.id },
          process.env.jwtSecret,
          { expiresIn: 999999999 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
              msg: "OK",
            });
          }
        );
      });
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) res.json({ msg: "User does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.json({ msg: "Invalid password" });
      // If password - OK
      jwt.sign(
        { id: user.id },
        process.env.jwtSecret,
        { expiresIn: 999999999 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            msg: "OK",
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
