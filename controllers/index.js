// Import the Router from Express
const router = require('express').Router();

// Import the API routes and home routes
const apiRoutes = require('./api'); // Import routes from the 'api' directory
const homeRoutes = require('./homeRoutes'); // Import routes from 'homeRoutes.js'

// Use homeRoutes for the root path ('/')
router.use('/', homeRoutes);

// Use apiRoutes for paths that start with '/api'
router.use('/api', apiRoutes);

// Export the router so it can be used in the main application
module.exports = router;
