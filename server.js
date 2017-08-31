"use strict"

// Dependencies
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const keys = require('./config/keys.js')
const collections = require('./db/collections.js')

// Initializing the application
const app = express()
const PORT_NUMBER = 8080

// Parsing the urlencoded HTTP requests
// Having the extended option marked true allows JSON-like objects to come through
app.use(bodyParser.urlencoded({ extended: true }));

// Connecting to the DB
MongoClient.connect(keys.DB_URL, (error, database) => {
  if (error) {
    return console.log(error)
  }

  // Load collections
  collections(database)

  // Adding routes by passing in the app and db
  require('./service/routes')(app, database)

  // Starting the app
  app.listen(PORT_NUMBER, () => {
    console.log('test on port ' + PORT_NUMBER + '!!!')
  })

})
