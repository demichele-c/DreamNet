const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// Route to get dashboard (ensures user is logged in)
router.get('/', async (req, res) => {
    // Check if the user is logged in
    if (!req.session.logged_in) {
        return res.redirect('/login'); // Redirect to login page if not logged in
    }

    try {
        // Retrieve the logged-in user's data
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }, // Exclude the password from the result
        });

        // Serialize the user data
        const user = userData.get({ plain: true });

        // Pass serialized data and session flag into the template
        res.render('dashboard', { 
            user, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to get dashboard (with auth middleware)
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
        });
    
        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) { 
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to get login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;
