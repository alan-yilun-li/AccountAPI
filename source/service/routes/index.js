'use strict'

const lifeRoutes = require('./lifecycle_routes')

module.exports = function(app, db) {
  lifeRoutes(app, db)
}
