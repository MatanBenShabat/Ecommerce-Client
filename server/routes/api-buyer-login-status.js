const express = require("express");
const BuyerLoginStatus = require("../models/buyer-login-status");
const LoginStatus = require("../models/login-status");
const router = express.Router();

router.get("/buyer-login-status", (req, res, next) => {
  BuyerLoginStatus.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/buyer-login-status/log-out", (req, res, next) => {
  req.body
    ? LoginStatus.updateMany({logged:true},{$set:{logged:"false"}})
        .then((data) => res.json(data))
        .catch(next)
    : res.json({ error: "invalid input" });
});
router.post("/buyer-login-status", (req, res, next) => {
  req.body
    ? BuyerLoginStatus.create(req.body)
        .then((data) => res.json(data))
        .catch(next)
    : res.json({ error: "invalid input" });
});

router.delete("/buyer-login-status/?:id", (req, res, next) => {
  BuyerLoginStatus.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});


module.exports = router;
