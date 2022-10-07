const express = require("express");
const UsersPostValidation = require("../middlewares/validation");
const usersControllers = require("../controllers/usersController");
const userExistsValidation = require("../middlewares/userExistsValidation")

const router = express.Router();

router
  .get("/users", usersControllers.getUsers)
  .post("/users", UsersPostValidation,userExistsValidation, usersControllers.createUser)
  .post("/users/login", usersControllers.login)
  .delete("/users/?:id", usersControllers.deleteUser);

module.exports = router;
