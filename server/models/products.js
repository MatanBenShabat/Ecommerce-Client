const mongoose = require("mongoose");
const ProductstScheme = mongoose.Schema({
    image: String,
    productsName: String,
    price:Number,
    currentBid:Number,
    user:String,
    winner:String

});

const Products = mongoose.model("products", ProductstScheme);
module.exports = Products;
 