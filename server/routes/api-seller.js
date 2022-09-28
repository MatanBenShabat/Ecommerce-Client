const express = require("express");
const Seller = require("../models/seller");
const router = express.Router();

router.get("/seller", (req, res, next) => {
  Seller.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/seller", (req, res, next) => {
  req.body
    ? Seller.create(req.body)
        .then((data) => res.json(data))
        .catch(next)
    : res.json({ error: "invalid input" });
});

router.delete("/seller/?:id", (req, res, next) => {
  Seller.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});


module.exports = router;
