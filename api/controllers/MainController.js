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
};
