"use strict"

const usersController = require('./controllers').users
const challengesController = require('./controllers').challenges
const authenticateToken = require('./middleware').authenticateToken

module.exports = function(app) {
  app.post('/users/login', (req, res) => {usersController.getToken(req, res)})
  app.post('/users', (req, res) => {usersController.insertUser(req, res)})

  // Use authenticate token method as middleware for this path
  app.use('/users/:username', authenticateToken)
  app.delete('/users/:username', (req, res) => {usersController.deleteUser(req, res)})
  app.get('/users/:username', (req, res) => {usersController.findUser(req, res)})
  app.put('/users/:username', (req, res) => {usersController.updateUser(req, res)})

  app.use('/challenges', authenticateToken)
  app.get('/challenges/:_id', (req, res) => {challengesController.getChallenge(req, res)})
  app.post('/challenges', (req, res) => {challengesController.createChallenge(req, res)})
  app.put('/challenges/:_id', (req, res) => {challengesController.updateChallenge(req, res)})
  app.delete('/challenges/:_id', (req, res) => {challengesController.deleteChallenge(req, res)})

}
