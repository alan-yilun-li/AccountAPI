"use strict"

const USER_URL = '/users'

module.exports = function(app, db) {

  // CREATING OR EDITING A USER
  app.post(USER_URL, (req, res) => {

    console.log(req.body)
    res.send('Create user works')
  })


  // DELETING A USER





  // GETTING A USER'S INFORMATION



}
