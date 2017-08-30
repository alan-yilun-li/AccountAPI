"use strict"

var Promise = require('promise')

const USER_URL = '/users'
const SPECIFIC_USER_PATH = '/:username'

module.exports = function(app, db) {

  const lifeCycleController = require('../controllers/lifeCycleController.js')(db)

  // CREATING A USER
  app.post(USER_URL, (req, res) => {

    const user = { username: req.body.username, password: req.body.password }
    lifeCycleController.insertUser(user).then(result => res.send(result))
  })


  // DELETING A USER
  app.delete(USER_URL + SPECIFIC_USER_PATH, (req, res) => {

    const username = req.params.username
    lifeCycleController.deleteUser(username).then(result => res.send(result))
  })


  // GETTING A USER'S INFORMATION
  app.get(USER_URL + SPECIFIC_USER_PATH, (req, res) => {

    const username = req.params.username
    lifeCycleController.findUser(username).then(result => res.send(result))
  })

  // UPDATING A USER'S INFORMATION
  app.put(USER_URL + SPECIFIC_USER_PATH, (req, res) => {

    const username = req.params.username
    const newData = { username: req.body.username, password: req.body.password }
    lifeCycleController.updateUser(username, newData).then(result => res.send(result))
  })
}
