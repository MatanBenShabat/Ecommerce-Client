const Joi = require("joi");

const UsersSchema = Joi.object().keys({
  username: Joi.string().alphanum().required(),
  password: Joi.string().min(8).max(15).alphanum().required(),
});

module.exports = UsersSchema;
