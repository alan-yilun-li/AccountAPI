"use strict"

const Promise = require('promise')
const User = require('../../db/collections').User

/*
Holds functions called in the routes.js file that
manage users themselves.
*/

module.exports = {
  // Inserting a new user into the DB
  insertUser: function insertUserToDB(req, res) {
    const user = { username: req.body.username, password: req.body.password }
    let newUser = new User(user)
    newUser.save().then((result) => {
      res.send({success: result})
    }).catch((error) => {
      res.send({error: error});
    })
  },

  // Deleting a user from the DB
  deleteUser: function deleteUserFromDB(req, res) {
    const username = req.params.username
    User.remove({ username: username}).then((result) => {
      // Returns a JSON string that we need to check for n (number of items changed)
      const resultObj = JSON.parse(result)
      if (resultObj.n == 1) {
        res.send({success: result})
      } else {

        // As there were != 1 items changed. Should only be zero.
        res.send({error: 'user does not exist'})
      }
    }).catch((error) => {
      return {error: error.errmsg}
    })
  },

  // Finding a given user from the DB by their username
  findUser: function findUserWithUsername(req, res) {
    const username = req.params.username
    User.findOne({ username: username }).then((result) => {
      // Checking if our query returns null
      if (result) {
        res.send(result)
      } else {
        res.send({error: 'No such user in DB'})
      }
    }).catch((error) => {
      res.send({error: error.errmsg})
    })
  },

  // Updating a given user's username and/or password from the DB by their username
  updateUser: function updateUserWithUsername(req, res) {
    const username = req.params.username
    const newData = { username: req.body.username, password: req.body.password }

    // Checking to see if any fields do not need to be updated...
    // This is so that we are not wiping the user's data by replacing it with null.
    let dataToUpdate = {}

    for (let key in newData) {
      if (newData[key]) {
        dataToUpdate[key] = newData[key]
      }
    }
    // Performing the actual DB operation
    User.updateOne(
      { username: username },
      { $set: dataToUpdate }
    ).then((result) => {
      // Returns a JSON string that we need to check for n (number of items changed)
      const resultObj = JSON.parse(result)

      if (resultObj.nModified == 1) {
        res.send({success: result})
      } else if (resultObj.n == 1) {
        res.send({error: 'tried to update with the same information'})
      } else { // As there were != 1 items changed. Should only be zero.
        res.send({error: 'user does not exist'})
      }
    }).catch((error) => {
      res.send({error: error.errmsg})
    })
  }
}
