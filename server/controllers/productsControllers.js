const Products = require("../models/products");

exports.getProducts = (req, res, next) => {
  Products.find({})
    .then((data) => res.json(data))
    .catch(next);
};
exports.createProduct = (req, res, next) => {
  if (req.body) {
    Products.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({ error: "invalid input" });
  }
};

exports.updateProduct = (req, res, next) => {
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
};
exports.deleteProduct = (req, res, next) => {
  Products.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
};
