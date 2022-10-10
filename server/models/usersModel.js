const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UsersScheme = mongoose.Schema({
  username: {
    type: String,
    required: [true, "A user must have a username"],
    minlength: 4,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
    //This only works on CREATE and SAVE
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  photo: String,

  userType: {
    type: String,
    required: true,
    enum: ["CUSTOMER", "ADMIN"],
    default: "CUSTOMER",
  },
});

UsersScheme.pre("save", async function (next) {
  //Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirm field cuz we don't need it in the DB
  this.passwordConfirm = undefined;
  next();
});

UsersScheme.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Users = mongoose.model("Users", UsersScheme);
module.exports = Users;
