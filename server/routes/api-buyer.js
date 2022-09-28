const express = require("express");
const Buyer = require("../models/buyer");
const LoginStatus = require("../models/login-status");
const router = express.Router();

router.get("/buyer", (req, res, next) => {
  Buyer.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/buyer", (req, res, next) => {
  req.body
    ? Buyer.create(req.body)
        .then((data) => res.json(data))
        .catch(next)
    : res.json({ error: "invalid input" });
});
router.post("/buyer-login-status/log-out", (req, res, next) => {
  req.body
    ? LoginStatus.updateMany({customerLogged:true},{$set:{customerLogged:"false"}})
        .then((data) => res.json(data))
        .catch(next)
    : res.json({ error: "invalid input" });
});

router.delete("/buyer/?:id", (req, res, next) => {
  Buyer.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});


module.exports = router;
