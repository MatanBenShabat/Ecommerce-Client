const express = require("express");
const UsersPostValidation = require("../middlewares/validation");
const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");
const userExistsValidation = require("../middlewares/userExistsValidation");

const router = express.Router();

router
  .post("/signup", authController.signup)
  .post("/login", authController.login)
  .post("/forgotPassword", authController.forgotPassword)
  .patch("/resetPassword/:token", authController.resetPassword);

router
  .get("/users", usersController.getUsers)
  .post(
    "/users",
    UsersPostValidation,
    userExistsValidation,
    usersController.createUser
  )
  .delete("/users/?:id", usersController.deleteUser);

module.exports = router;
