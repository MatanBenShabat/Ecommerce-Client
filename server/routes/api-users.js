const express = require("express");
const Users = require("../models/users");
const LoginStatus = require("../models/login-status");
const authorize = require("../Utils/authorize");

const router = express.Router();

router.get("/users", (req, res, next) => {
  Users.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/users", (req, res, next) => {
  if (!req.body) res.json({ error: "invalid input" });

  Users.create(req.body)
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/users/login", (req, res, next) => {
  Users.findOne({ username: req.body.username })

    .then((user) => {
      if (!authorize(req, user)) {
        res.status(401).json({
          status: "error",
          messege: "password is incorrect",
        });
      } else {
        res.status(200).json({ status: "success", data: { user } });
      }
    })
    .catch(next);
});

router.delete("/users/?:id", (req, res, next) => {
  Users.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
