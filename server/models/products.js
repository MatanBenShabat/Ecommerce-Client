const mongoose = require("mongoose");
const ProductstScheme = mongoose.Schema({
  product : {
    image: String,
    productsName: String,
    price:Number,
    // required: true
  }
});

const Products = mongoose.model("products", ProductstScheme);
module.exports = Products;
 