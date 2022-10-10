const jwt = require('jsonwebtoken');
const AppError = require("../Utils/appError");
const Users = require("../models/usersModel");
const catchAsync = require("../Utils/catchAsync");

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await Users.create({
    //Prevents from the user to select role(admin for exam) by himself-we get only what we need WITHOUT the users role
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1)Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  //2)Chec if user exsists && password is correct

  const user = await Users.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password.toString(), user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  //3)If evertything ok, send token to client

  
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
