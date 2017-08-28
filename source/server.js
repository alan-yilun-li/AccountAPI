"use strict"

const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')

const app = express()
const port = 8080

require('./service/routes')(app, {})

app.listen(port, () => {
  console.log('test on port ' + port + '!!!')
})
