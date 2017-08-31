"use strict"

var Promise = require('promise')

module.exports = function(app, db) {
  const lifeCycleController = require('./controllers/usersController.js')(db)
  app.post('/users', (req, res) => {
    lifeCycleController.insertUser(req).then(result => res.send(result))
  })
  app.delete('/users/:username', (req, res) => {
    lifeCycleController.deleteUser(req).then(result => res.send(result))
  })
  app.get('/users/:username', (req, res) => {
    lifeCycleController.findUser(req).then(result => res.send(result))
  })
  app.put('/users/:username', (req, res) => {
    lifeCycleController.updateUser(req).then(result => res.send(result))
  })
}
