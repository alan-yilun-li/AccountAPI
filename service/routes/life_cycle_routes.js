"use strict"

const USER_URL = '/users'

module.exports = function(app, db) {

  // CREATING OR EDITING A USER
  app.post(USER_URL, (req, res) => {

    const user = { username: req.body.username, password: req.body.password }

    db.collection('users').insert(user, (error, result) => {
      if (error) {
        res.send({ 'error': 'Error occurred with creating user on DB' })
      } else {
        res.send(result)
      }
    })
  })


  // DELETING A USER





  // GETTING A USER'S INFORMATION



}
