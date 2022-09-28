const mongoose = require("mongoose");
const SellerScheme = mongoose.Schema({
  userName: {
    username: String,
    email: String,
    image: String,
    // required: true,
  },
  
  password: {
    type: String,
    // required: true,

  },
  product : {
    type: String,
    image: String,
    productsName: String,
    price:Number,
    // required: true,
  }
});

const Seller = mongoose.model("seller", SellerScheme);
module.exports = Seller;
