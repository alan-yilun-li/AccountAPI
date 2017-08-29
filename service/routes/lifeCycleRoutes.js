"use strict"

var ObjectID = require('mongodb').ObjectID

const USER_URL = '/users'
const SPECIFIC_USER_PATH = '/:id'

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
  app.get(USER_URL + SPECIFIC_USER_PATH, (req, res) => {

    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    var results = db.collection('users').findOne(details, (error, item) => {

      if (error) {
        res.send({ 'error' : 'An error!!!!!'});
      } else {
        res.send(item);
      }
    })
  })

}
