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
    // get the users in the array 

    let foundUser = users.find((user)=>{
      return user.id === Number(req.params.id);
    });

    // log the found user to the console
    console.log(foundUser);

    // send a response with the user
    if(foundUser !== true){
      res
      .status(404)
      .status(404).send('Error!! User not found ${req.params.id} is not found');
    }
    res.json(foundUser)
  },

  addNewUser: function (req, res) {
    // add new entry into database
   users.push(req.body);

   res.json(req.body);
  },

  updateUser: function (req, res){
    // check if the user exists in the database
        let foundUser = users.find((user)=>{
      return user.id === Number(req.params.id);
    });

    //if exists update and respond
    let userIndex = users.indexOf(foundUser);
    
    users[userIndex] = req.body;
    res.status(200).send(`User with id ${req.params.id} has been updated successfully!`);
    // otherwise send an error message
  },

    // delete function
    deleteUser: function (req, res){
      // check if the user exists in the database
          let foundUser = users.find((user)=>{
        return user.id === Number(req.params.id);
      });

      // check if user exists
      let userIndex = users.indexOf(foundUser);
      // proceed in deletion
      let deletedUser = users.splice(userIndex, + 1);
      console.log(deletedUser);

      // send response
      res.json(deletedUser);
    }
};
