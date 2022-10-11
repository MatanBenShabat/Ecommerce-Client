const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../Utils/appError");
const Users = require("../models/usersModel");
const catchAsync = require("../Utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await Users.create({
    //Prevents from the user to select role(admin for exam) by himself-we get only what we need WITHOUT the users role
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    userType: req.body.userType,
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

  if (
    !user ||
    !(await user.correctPassword(password.toString(), user.password))
  ) {
    return next(new AppError("Incorrect email or password", 401));
  }
  //3)If evertything ok, send token to client

  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  //2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //3) Check if user still exists
  const currentUser = await Users.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to the token does no longer exists.",
        401
      )
    );
  }
  //4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfer(decoded.iat)) {
    return next(
      new AppError(
        "User recently changed his Password/Email/Username. Please login again.",
        401
      )
    );
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

exports.restrictTo = (...userTypes) => {
  return (req, res, next) => {
    if (!userTypes.includes(req.user.userType)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
