"use strict"

const usersController = require('./controllers').users
const authenticateToken = require('./middleware').authenticateToken

module.exports = function(app) {
  app.post('/users/login', (req, res) => {usersController.getToken(req, res)})
  app.post('/users', (req, res) => {usersController.insertUser(req, res)})

  // Use authenticate token method as middleware for this path
  app.use('/users/:username', authenticateToken)
  app.delete('/users/:username', (req, res) => {usersController.deleteUser(req, res)})
  app.get('/users/:username', (req, res) => {usersController.findUser(req, res)})
  app.put('/users/:username', (req, res) => {usersController.updateUser(req, res)})

}
