"use strict"

const usersController = require('./controllers/usersController.js')

module.exports = function(app) {
  app.post('/users', (req, res) => {usersController.insertUser(req, res)})
  app.delete('/users/:username', (req, res) => {usersController.deleteUser(req, res)})
  app.get('/users/:username', (req, res) => {usersController.findUser(req, res)})
  app.put('/users/:username', (req, res) => {usersController.updateUser(req, res)})
}
