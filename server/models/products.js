const mongoose = require("mongoose");
const ProductstScheme = mongoose.Schema({
    image: {type:String,required:[true, 'A product must have an image']},
    productsName: {type:String,required:[true, 'A product must have a name']},
    price:{type:Number,required:[true, 'A product must have a price']},
    currentBid:{type:Number,default:null},
    currentBidder:{type:String,default:"No One Yet"},
    seller:{type:String,default:"No One Yet"},
    winner:{type:String,default:"No One Yet"}

});

const Products = mongoose.model("products", ProductstScheme);
module.exports = Products;
 