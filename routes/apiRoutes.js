const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const dreamController = require('../controllers/dreamController');
const insightController = require('../controllers/insightController');
const userController = require('../controllers/userController');
const { User } = require('../models');

// Register a new user with hashed password
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            console.error('Registration failed: Missing username or password');
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// Login user and compare hashed password
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            console.error('Login failed: Invalid username or password');
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare the hashed password with the provided password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.error('Login failed: Invalid password');
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Dream routes
router.post('/dreams', dreamController.createDream);
router.get('/dreams', dreamController.getDreams);

// Insight routes
router.get('/insights', insightController.getInsights);

module.exports = router;
