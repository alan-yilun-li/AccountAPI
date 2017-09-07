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
    deleteUser: function deleteUserWithUsername(username) {
      return db.collection('users').deleteOne({ username: username})
      .then((result) => {
        // Returns a JSON string that we need to check for n (number of items changed)
        const resultObj = JSON.parse(result)
        if (resultObj.n == 1) {
          return {success: result}
        } else {

          // As there were != 1 items changed. Should only be zero.
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
        // Checking if our query returns null
        if (result) {
          return result
        } else {
          return {error: 'No such user in DB'}
        }
      })
      .catch((error) => {
        return {error: error.errmsg}
      })
    },


    // Updating a given user's username and/or password from the DB by their username
    updateUser: function updateUserWithUsername(username, newData) {

      // Checking to see if any fields do not need to be updated...
      // This is so that we are not wiping the user's data by replacing it with null.
      const dataToUpdate = {}

      for (var key in newData) {
        if (newData[key]) {
          dataToUpdate[key] = newData[key]
        }
      }

      // Performing the actual DB operation
      return db.collection('users').updateOne(
        { username: username },
        { $set: dataToUpdate }
      )
      .then((result) => {
        // Returns a JSON string that we need to check for n (number of items changed)
        const resultObj = JSON.parse(result)
        if (resultObj.nModified == 1) {
          return {success: result}
        } else if (resultObj.n == 1) {
          return {error: 'tried to update with the same information'}
        } else {
          // As there were != 1 items changed. Should only be zero.
          return {error: 'user does not exist'}
        }
      })
      .catch((error) => {
        return {error: error.errmsg}
      })
    }
  }
}
