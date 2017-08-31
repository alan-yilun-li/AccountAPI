"use strict"

var Promise = require('promise')

module.exports = function(app, db) {
  const lifeCycleController = require('./controllers/usersController.js')(db)
  app.post('/users', (req, res) => {lifeCycleController.insertUser(req, res)})
  app.delete('/users/:username', (req, res) => {lifeCycleController.deleteUser(req, res)})
  app.get('/users/:username', (req, res) => {lifeCycleController.findUser(req, res)})
  app.put('/users/:username', (req, res) => {lifeCycleController.updateUser(req, res)})
}
