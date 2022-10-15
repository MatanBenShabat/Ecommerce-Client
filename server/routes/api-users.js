const express = require("express");
const UsersPostValidation = require("../middlewares/validation");
const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");
const userExistsValidation = require("../middlewares/userExistsValidation");

const router = express.Router();

router
  .post("/signup", authController.signup)
  .post("/startApp", authController.protect, authController.startApp)
  // .post('/logout',authController.logout)
  .post('/logout',authController.protect,authController.logout)
  .post("/login", authController.login,)
  .post("/forgotPassword", authController.forgotPassword)
  .patch("/resetPassword/:token", authController.resetPassword)
  .patch(
    "/updateMyPassword",
    authController.protect,
    authController.updatePassword
  );

router
  .patch("/updateMe", authController.protect, usersController.upadateMe)
  .delete("/deleteMe", authController.protect, usersController.deleteMe)

  .get("/users", usersController.getUsers)
  .post(
    "/users",
    UsersPostValidation,
    userExistsValidation,
    usersController.createUser
  )
  .delete("/users/?:id", usersController.deleteUser);

module.exports = router;
