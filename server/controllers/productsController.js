const Products = require("../models/productsModel");
const APIFeatures = require("../Utils/apiFeatures");
const AppError = require('../Utils/appError')
const catchAsync = require("../Utils/catchAsync");

exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "price";
  req.query.fields = "productsName,price,image";
  next();
};
exports.getProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Products.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Products.findById(req.params.id);
  
if(!product) {
  return next(new AppError('No product found with that ID',404))
}

  res.status(200).json({
    status: 'success',
    data:{
      product
    }
  })
});

exports.createProduct = catchAsync(async (req, res, next) => {
  newProduct = await Products.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if(!updatedProduct) {
    return next(new AppError('No product found with that ID',404))
  }
  

  res.status(200).json({
    status: "success",
    data: {
      product: updatedProduct,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Products.findOneAndDelete({ _id: req.params.id });

  if(!product) {
    return next(new AppError('No product found with that ID',404))
  }  

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getProductsStats = catchAsync(async (req, res, next) => {
  const stats = await Products.aggregate([
    {
      $match: { rating: { $gte: 4 } },
    },
    {
      $group: {
        _id: { $toUpper: "$brand" },
        numProducts: { $sum: 1 },
        avgRating: { $avg: "$rating" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);
  res.status(200).json({
    status: "success",
    results: stats.length,
    data: {
      stats,
    },
  });
});
