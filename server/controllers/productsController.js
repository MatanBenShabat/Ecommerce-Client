const Products = require("../models/productsModel");
const APIFeatures = require("../Utils/apiFeatures");

exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price';
  req.query.fields = 'productsName,price,image';
  next();
};
exports.getProducts = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Products.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const products = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
exports.createProduct = async (req, res) => {
  try {
    newProduct = await Products.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      messege: "Invalid data sent!  ",
    });
  }
};

exports.updateProduct = (req, res, next) => {
  req.body
    ? Products.updateOne(
        { _id: req.params.id },
        { $set: { currentBid: req.body.currentBid } },
        { $set: { currentBidder: req.body.currentBidder } }
      )
        .then((data) => res.status(200).json(data))
        .then(console.log(req.body.currentBid))
        .catch(next)
    : res.json({ error: "invalid input" });
};
exports.deleteProduct = async (req, res, next) => {
  try{
    const product = await Products.findOneAndDelete({ _id: req.params.id })
    res.status(204).json({
    // res.status(200).json({
      status:"success",
      data:null
      // data: product
    })
  }
    catch(err){
      res.status(400).json({
        status:"fail",
        messege:"Error"
      })
    };
};
