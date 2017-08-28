"use strict"

// This file is to include all the CRUD operations for USERS.

const lifeCycleRoutes = require('./lifecycle_routes')

module.exports = function(app, db) {
  lifeCycleRoutes(app, db)

}
