const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('home'));
router.get('/dashboard', (req, res) => res.render('dashboard'));
router.get('/dreams', (req, res) => res.render('dream'));
router.get('/insights', (req, res) => res.render('insights'));

// Route to render the login page
router.get('/login', (req, res) => {
    res.render('login', { layout: 'main' });  // Make sure 'login.handlebars' exists in 'views'
  });
  
  // Serve the registration page
router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;
