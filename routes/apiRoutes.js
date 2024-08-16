const express = require('express');
const router = express.Router();
const dreamController = require('../controllers/dreamController');
const insightController = require('../controllers/insightController');
const userController = require('../controllers/userController');

router.post('/dreams', dreamController.createDream);
router.get('/dreams', dreamController.getDreams);
router.get('/insights', insightController.getInsights);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
