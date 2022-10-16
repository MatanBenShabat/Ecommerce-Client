const mongoose = require("mongoose");
const ProductstScheme = mongoose.Schema({
  image: {
    type: String,
    required: [true, "A product must have an image"],
    trim: true,
  },
  productsName: {
    type: String,
    unique: [true, "Name already exists"],
    required: [true, "A product must have a name"],
    minlength: [2," A productsname must have more or equal then 2 characters"],
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
    required: [true, "A product must have a brand"],
  },
  price: { type: Number, required: [true, "A product must have a price"] },
  rating: {
    type: Number,
    default: 5,
    max: [5, "Rating must be below 5"],
    min: [1, "Rating must be above 5"],
  },
  description: {
    type: String,
    required: [true, "A product must have a description"],
    maxlength: [200, "Description should not be longer then 200 charachters"],
  },
  currentBid: {
    type: Number,
    default: 0,
  },
  currentBidder: { type: String, default: "No One Yet" },
  seller: String,
  winner: { type: String, default: "No One Yet" },
  createDate: { type: Date, default: Date.now() },
  endOfAuctionDate: { type:Date, default: Date.now() + 1000 * 60 * 60 * 24 * 3}
});

const Products = mongoose.model("Products", ProductstScheme);
module.exports = Products;
