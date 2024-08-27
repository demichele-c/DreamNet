// File: controllers/api/index.js

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dreamRoutes = require('./dreamRoutes');

router.use('/users', userRoutes);
router.use('/dreams', dreamRoutes);  // Ensure this line is present and correct

module.exports = router;
