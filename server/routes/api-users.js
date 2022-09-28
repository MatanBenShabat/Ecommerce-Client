const express = require("express");
const Users = require("../models/users");
const LoginStatus = require("../models/login-status");

const router = express.Router();

router.get("/users", (req, res, next) => {
  Users.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/users", (req, res, next) => {
  req.body
    ? Users.create(req.body)
        .then((data) => res.json(data))
        .catch(next)
    : res.json({ error: "invalid input" });
});


router.delete("/users/?:id", (req, res, next) => {
  Users.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});


module.exports = router;
