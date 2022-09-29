const express = require("express");
const LoginStatus = require("../models/login-status");1
const router = express.Router();

router.get("/login-status", (req, res, next) => {
  LoginStatus.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/login-status/log-out", (req, res, next) => {
  req.body
    ? LoginStatus.updateMany({logged:true},{$set:{logged:"false"}})
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
