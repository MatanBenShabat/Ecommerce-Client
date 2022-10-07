const mongoose = require("mongoose");
const ProductstScheme = mongoose.Schema({
    image: {type:String,required:[true, 'A product must have an image'],trim: true},
    productsName: {type:String,unique:[true,'Name already exists'],required:[true, 'A product must have a name'],trim: true},
    price:{type:Number,required:[true, 'A product must have a price']},
    currentBid:{type:Number,default:null},
    currentBidder:{type:String,default:"No One Yet"},
    seller:{type:String,default:"No One Yet"},
    winner:{type:String,default:"No One Yet"},
    createDate:{type:Date,default:Date.now()}


});

const Products = mongoose.model("Products", ProductstScheme);
module.exports = Products;
 