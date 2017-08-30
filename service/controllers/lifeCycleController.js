"use strict"

var Promise = require('promise')

/*
  Holds functions called in the lifeCycleRoutes.js file to
  manage users themselves.
*/

module.exports = (db) => {
  return {

    // Inserting a new user into the DB
    insertUser: function insertUserToDB(user) {
      return db.collection('users').insert(user)
      .then((result) => {
        return result
      })
      .catch((error) => {
        return {error: error.errmsg}
      })
    },

    // Deleting a user from the DB
    deleteUser: function deleteUserFromDB(username) {
      return db.collection('users').deleteOne({ username: username})
      .then((result) => {
        const resultObj = JSON.parse(result)
        if (resultObj.n == 1) {
          return {success: result}
        } else {
          return {error: 'user does not exist'}
        }
      })
      .catch((error) => {
        return {error: error.errmsg}
      })
    },

    // Finding a given user from the DB by their username
    findUser: function findUserWithUsername(username) {
      return db.collection('users').findOne({ username: username })
      .then((result) => {
        if (result) {
          return result
        } else {
          return {error: 'No such user in DB'}
        }
      })
      .catch((error) => {
        return {error: error.errmsg}
      })
    }
  }
}
