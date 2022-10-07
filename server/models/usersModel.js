const mongoose = require("mongoose");
const UsersScheme = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A user must have a username'],
    unique: true,
    trim: true,

  },

  password: {
    type: String,
    required: [true, 'A user must have a password'],
    select: false
  },
  userType: {
    type: String,
    required: true,
    enum: ["CUSTOMER", "ADMIN"],
    default: "CUSTOMER",
  },
}); 
const Users = mongoose.model("Users", UsersScheme);
module.exports = Users;
