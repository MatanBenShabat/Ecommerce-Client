const express = require("express");
const Products = require("../models/products");
const router = express.Router();

router.get("/products", (req, res, next) => {
  Products.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/products", (req, res, next) => {
  if (req.body) {
    Products.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({ error: "invalid input" });
  }
});
router.patch("/products/:id", (req, res, next) => {
  req.body
    ? Products.updateOne(
        { _id: req.params.id },
        { $set: { currentBid: req.body.currentBid } },
        { $set: { currentBidder: req.body.currentBidder } }
      )
        .then((data) => res.json(data))
        .then(console.log(req.body.currentBid))
        .catch(next)
    : res.json({ error: "invalid input" });
});

router.delete("/products/:id", (req, res, next) => {
  Products.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
