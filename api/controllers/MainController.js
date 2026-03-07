/**
 * MainController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

require("dotenv").config();

let users = [
  { id: 1, name: "John Doe", age: 33 },
  { id: 2, name: "Mary Jane Watson", age: 35 },
  { id: 3, name: "Betty Crocker", age: 60 },
];

module.exports = {
  isAlive: function (req, res) {
    res.send(
      `Hello World! The code is in ${process.env.NODE_ENV} @ PORT ${process.env.PORT}`,
    );
  },

  getUserById: function (req, res) {
    //get the user in the Array
    let foundUser = users.find((user) => {
      return user.id === Number(req.params.id);
    });

    //send a response
    if (foundUser !== true) {
      res
        .status(404)
        .send(`ERROR! User with an id of ${req.params.id} does not exist!`);
    }
    res.json(foundUser);
  },

  addNewUser: function (req, res) {
    //add new entry into the database
    users.push(req.body);

    res.json(req.body);
  },

  updateUser: function (req, res) {
    //check if the user exists
    let foundUser = users.find((user) => {
      return user.id === Number(req.params.id);
    });
    //if exists, update then respond
    let userIndex = users.indexOf(foundUser);

    users[userIndex] = req.body;
    res.status(200).send(`Successfully updated user of id ${req.params.id}`);

    //otherwise send an error message
  },

  deleteUser: function (req, res) {
    //check if user exists
    let foundUser = users.find((user) => {
      return user.id === Number(req.params.id);
    });

    let userIndex = users.indexOf(foundUser);
    //proceed with deletion
    let deletedUser = users.splice(userIndex, 1);
    //send a response
    res.json(deletedUser);
  },
};
