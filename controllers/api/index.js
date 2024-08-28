// Import the Router method from Express to create a new router instance
const router = require('express').Router();

// Import user-related routes from the 'userRoutes' module
const userRoutes = require('./userRoutes');
// Import dream-related routes from the 'dreamRoutes' module
const dreamRoutes = require('./dreamRoutes');

// Use the user routes for any paths that start with '/users'
// This means any route defined in 'userRoutes' will be prefixed with '/users'
router.use('/users', userRoutes);

// Use the dream routes for any paths that start with '/dreams'
// This means any route defined in 'dreamRoutes' will be prefixed with '/dreams'
router.use('/dreams', dreamRoutes);

// Export the router so it can be used in other parts of the application
// This allows us to modularize our route definitions
module.exports = router;
