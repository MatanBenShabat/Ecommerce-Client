const Users = require("../models/users");

exports.getUsers = (req, res, next) => {
  Users.find({})
    .then((data) => res.json(data))
    .catch(next);
};

exports.createUser = (req, res, next) => {
  if (!req.body) res.json({ error: "invalid input" });

  Users.create(req.body)
    .then((data) => res.status(201).json(data))
    .catch(next);
};
exports.login = (req, res, next) => {
  Users.findOne({ username: req.body.username })

    .then((user) => {
      if (!authorize(req, user)) {
        res.status(401).json({
          status: "error",
          messege: "password is incorrect",
        });
      } else {
        res.status(200).json({ status: "success", data: { user } });
      }
    })
    .catch(next);
};

exports.deleteUser = (req, res, next) => {
  Users.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
};