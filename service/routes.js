"use strict"

const usersController = require('./controllers').users
const authenticateToken = require('./middleware').authenticateToken

module.exports = function(app) {
  // Use authenticate token method as middleware for this path
  app.use('/users/:username', authenticateToken)

  app.post('/users', (req, res) => {usersController.insertUser(req, res)})
  app.delete('/users/:username', (req, res) => {usersController.deleteUser(req, res)})
  app.get('/users/:username', (req, res) => {usersController.findUser(req, res)})
  app.put('/users/:username', (req, res) => {usersController.updateUser(req, res)})
}
