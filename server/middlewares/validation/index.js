const UsersSchema = require("./UserSchema");

const UsersPostValidation = (req, res, next) => {
  const { body } = req;
  // const body = req.body^^^^
  const result = UsersSchema.validate(body);

  // console.log((result));

  const { value, error } = result;

  const valid = (error == null);

  if (!valid) {
    res.status(422).json({
      messege: "Invalid Request",
      data: value,
      error: `This is your error ${error}`,
    });
  } else {
    next();
  }
};

module.exports = UsersPostValidation
