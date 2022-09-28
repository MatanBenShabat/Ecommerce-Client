const mongoose = require("mongoose");
const BuyerScheme = mongoose.Schema({
  userName: {
    username: String,
    email: String,
    image: String,
    // required: true
  },
  
  password: {
    type: String,
    // required: true,
  }
});

const Buyer = mongoose.model("buyer", BuyerScheme);
module.exports = Buyer;
