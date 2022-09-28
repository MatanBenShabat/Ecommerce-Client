const mongoose = require("mongoose");
const SellerCartScheme = mongoose.Schema({
  product : {
    type: String,
    image: String,
    productsName: String,
    price:Number,
    approve: Boolean,
    // required: true
  }
});

const SellerCart = mongoose.model("seller-cart", SellerCartScheme);
module.exports = SellerCart;
