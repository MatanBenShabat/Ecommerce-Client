const express = require("express");
const Users = require("../models/users");
const authorize = require("../Utils/authorize");
const { date } = require('joi');
const UsersPostValidation = require('../middlewares/validation');
const usersControllers = require("../controllers/usersControllers")

const UsersSchema = require("../middlewares/validation/UserSchema")

const router = express.Router();

router.get("/users", usersControllers.getUsers);

router.post("/users",UsersPostValidation, usersControllers.createUser);

router.post("/users/login",usersControllers.login );

router.delete("/users/?:id", usersControllers.deleteUser);

module.exports = router;
