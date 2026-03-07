/**
 * MainController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

require("dotenv").config();

let users = [{ id: 0, name: "John Doe", age: 33 }];

module.exports = {
  isAlive: function (req, res) {
    res.send(
      `Hello World! The code is in ${process.env.NODE_ENV} @ PORT ${process.env.PORT}`,
    );
  },

  addUser: function (req, res) {
    users.push(req.body);
    console.log(users);
    res.status(200).send(`User ${req.body.name} is inserted into the db`);
  },

  findUserById: function (req, res) {
    let userFound = users.find((user) => {
      if (user.id == Number(req.params.id)) {
        return user;
      }
    });
    user.find();
    res.status(200).json(userFound);
  },

  updateUserById: function (req, res) {
    let user = users.find((user, index) => {
      return user.id === Number(req.params.id);
    });

    users[user.id] = req.body;
    console.log(users);
  },

  deleteUser: function (req, res) {
    let deletedUser = users.find((user) => {
      return user.id === Number(req.params.id);
    });

    let indexOfUser = users.indexOf(deletedUser);

    users.splice(indexOfUser);
    console.log(users);
  },
};
