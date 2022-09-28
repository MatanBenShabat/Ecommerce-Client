const mongoose = require("mongoose");
const UsersScheme = mongoose.Schema({
  customerUserName: {
    type: String,
    // required: true
  },
  
  customerPassword: {
    type: String,
    // required: true,
  },
  adminUserName: {
    type: String,
    // required: true
  },
  
  adminPassword: {
    type: String,
    // required: true,
  }
});

const Users = mongoose.model("users", UsersScheme);
module.exports = Users;
