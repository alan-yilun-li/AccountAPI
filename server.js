"use strict"

// Dependencies
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')

// Initializing the application
const app = express()
const port = 8080

// Parsing the urlencoded HTTP requests
// Having the extended option marked true allows JSON-like objects to come through
app.use(bodyParser.urlencoded({ extended: true }));

// Adding routes by passing in the app and db
require('./service/routes')(app, {})

// Starting the app
app.listen(port, () => {
  console.log('test on port ' + port + '!!!')
})
