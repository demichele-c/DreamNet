const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('home'));
router.get('/dashboard', (req, res) => res.render('dashboard'));
router.get('/dreams', (req, res) => res.render('dream'));
router.get('/insights', (req, res) => res.render('insights'));

module.exports = router;
