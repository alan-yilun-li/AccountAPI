"use strict"

const Promise = require('promise')
const User = require('../../db/collections').User
const token = require('rand-token')
const usersPresenter = require('../presenters').users

/*
Holds functions called in the routes.js file that
manage users themselves.
*/

module.exports = {
  // Inserting a new user into the DB
  insertUser: function insertUserToDB(req, res) {
    const user = { username: req.body.username, password: req.body.password, token: token.generate(16) }
    let newUser = new User(user)
    newUser.save().then((result) => {
      res.send({success: 1, user: usersPresenter.present(result)})
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
        res.send({success: 1, user: usersPresenter.present(result)})
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
    const newData = { username: req.body.username }
    // Separate password, handled differently
    const newPassword = req.body.password ? req.body.password : ""

    for (let key in newData) {
      if (!newData[key]) {
        delete newData[key]
      }
    }

    User.findOne({ username: username }).then((user) => {
      user.comparePassword(newPassword).then((isMatch) => {
        user.set(newData)
        if ((newPassword && !isMatch) || user.isModified()) {
          newData.password = newPassword
          user.set(newData)
          user.save().then((result) => {
            res.send({success: 1, user: usersPresenter.present(result)})
          }).catch((err) => {
            res.send({error: err.errmsg})
          })
        } else {
          res.send({error: 'tried to update with the same information'})
        }
      }).catch((err) => {
        res.send({error: 1})
      })  
    }).catch((err) => {
      res.send({error: err.errmsg})
    })
  },

  getToken: function getTokenWithUsername(req, res) {
    const username = req.body.username
    const password = req.body.password
    User.findOne({ username: username }).then((result) => {
      result.comparePassword(password).then((isMatch) => {
        if (isMatch) {
          res.send({token: result.token})
        } else {
          res.send({error: "auth error"})
        }
      }).catch(() => {
        res.send({error: "auth error"})
      })
    }).catch((err) => {
      res.send({error: "query error"})
    })
  }
}
