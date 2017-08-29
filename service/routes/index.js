"use strict"

/*

  Index.js is the default export when a folder is required.
  Hence, when we require /routes, we are requiring this index.js file
  which hence should include all the routes.

*/

// Adding dependent routes
const lifeCycleRoutes = require('./lifeCycleRoutes')

// Packaging and exporting
module.exports = function(app, db) {
  lifeCycleRoutes(app, db)


}
