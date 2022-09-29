const mongoose = require("mongoose");
const UsersScheme = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ["CUSTOMER", "ADMIN"],
    default: "CUSTOMER",
  },
});

const Users = mongoose.model("users", UsersScheme);
module.exports = Users;
