const express = require("express");
const LoginStatus = require("../models/login-status");
const Users = require("../models/users");
const router = express.Router();

router.get("/login-status", (req, res, next) => {
  LoginStatus.find({})
    .then((data) => res.json(data))
    .catch(next);
});
router.post("/login-status/login", (req, res, next) => {
  Users.find({}, function (err, result) {
    if (
      result[0].adminUserName === req.body.username &&
      result[0].adminPassword === req.body.password
    ) {
      LoginStatus.updateMany(
        { adminLogged: false },
        { $set: { adminLogged: "true" } }
      )
        .then((data) => res.json(data))
        .catch(next);
    } else if (
      result.some((e) => 
        e.customerUserName === req.body.username &&
        e.customerPassword === req.body.password)
      
    ) {
      LoginStatus.updateMany(
        { customerLogged: false },
        { $set: { customerLogged: "true" } }
      )
        .then((data) => res.json(data))
        .catch(next);
    } else {
      res.json({ error: "invalid input" });
    }
  });
});

router.post("/login-status/log-out", (req, res, next) => {
  true
    ? LoginStatus.updateMany(
        { adminLogged: true },
        { $set: { adminLogged: "false" } }
        )  
        .then((data) => res.json(data))
        .catch(next)
    : res.json({ error: "invalid input" });
});
router.post("/login-status/log-out-customer", (req, res, next) => {
  true
     ? 
     LoginStatus.updateMany(
        { customerLogged: true },
        { $set: { customerLogged: "false" } }) 
        .then((data) => res.json(data))
        .catch(next)
    : res.json({ error: "invalid input" });
});
router.post("/login-status", (req, res, next) => {
  req.body
    ? LoginStatus.create(req.body)
        .then((data) => res.json(data))
        .catch(next)
    : res.json({ error: "invalid input" });
});

router.delete("/login-status/?:id", (req, res, next) => {
  LoginStatus.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
