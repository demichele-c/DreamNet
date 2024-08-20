// routes/viewRoutes.js
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware'); // Adjust path if necessary

router.get('/', (req, res) => res.render('home'));

router.get('/dashboard', isAuthenticated, (req, res) => res.render('dashboard'));
router.get('/dreams', isAuthenticated, (req, res) => res.render('dream'));
router.get('/insights', isAuthenticated, (req, res) => res.render('insights'));

router.get('/login', (req, res) => {
    res.render('login', { layout: 'main' });
});

router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;
