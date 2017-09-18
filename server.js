"use strict"

// Dependencies
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const keys = require('./config/keys.js')
const collections = require('./db/collections.js')

// Initializing the application
const app = express()
const PORT_NUMBER = 8080

// Parsing the urlencoded HTTP requests
// Having the extended option marked true allows JSON-like objects to come through
app.use(bodyParser.urlencoded({ extended: true }));

// Configure mongoose to use naitive js promises
mongoose.Promise = global.Promise

// Connecting to the DB
mongoose.connect(keys.DB_URL, {useMongoClient: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('openUri', function() {
  // Adding routes by passing in the app and db
  require('./service/routes')(app)

  // Starting the app
  app.listen(PORT_NUMBER, () => {
    console.log('test on port ' + PORT_NUMBER + '!!!')
  })
})
