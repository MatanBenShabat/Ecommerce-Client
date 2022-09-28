const express = require("express");
const SellerCart = require("../models/seller-cart");
const router = express.Router();

router.get("/sellerCart", (req, res, next) => {
  SellerCart.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/sellerCart", (req, res, next) => {
  req.body
    ? SellerCart.create(req.body)
        .then((data) => res.json(data))
        .catch(next)
    : res.json({ error: "invalid input" });
});

router.delete("/sellerCart/?:id", (req, res, next) => {
  SellerCart.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});


module.exports = router;
