const mongoose = require("mongoose");
const LoginStatusScheme = mongoose.Schema({
  adminLogged: {
    type: Boolean,
  },
  customerLogged: {
    type: Boolean,
  },
});

const LoginStatus = mongoose.model("login-status", LoginStatusScheme);
module.exports = LoginStatus;
