const router = require('express').Router();
const { Dream, User, Interpretation } = require('../models');
const withAuth = require('../utils/auth');

// Route to get the initial homepage or redirect based on login status
router.get('/', async (req, res) => {
    try {
        if (req.session.logged_in) {
            // If the user is logged in, redirect to the dashboard or home page
            res.redirect('/dashboard'); 
        } else {
            // If the user is not logged in, render the homepage or login page
            res.render('homepage', {
                logged_in: req.session.logged_in
            });
        }
    } catch (err) {
        console.error('Error in / route:', err);
        res.status(500).json(err);
    }
});

// Route to get all dreams for the logged-in user
router.get('/dreams', withAuth, async (req, res) => {
    try {
        const dreamData = await Dream.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: User, attributes: ['name'] }],
        });

        const dreams = dreamData.map((dream) => dream.get({ plain: true }));

        res.render('dreams', { 
            name: req.session.name, 
            dreams,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error('Error in /dreams route:', err);
        res.status(500).json(err);
    }
});
// Route to get all dreams for the logged-in user

// Route to get a single dream by id
router.get('/dream/:id', async (req, res) => {
    try {
        const dreamData = await Dream.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['name'] }],
        });

        if (!dreamData) {
            res.status(404).json({ message: 'No dream found with this id!' });
            return;
        }

        const dream = dreamData.get({ plain: true });

        res.render('dream-detail', { 
            dream,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        console.error('Error in /dream/:id route:', err);
        res.status(500).json(err);
    }
});
// controllers/homeroutes.js
router.get('/insights', withAuth, async (req, res) => {
  try {
    console.log('User ID from session:', req.session.user_id); // Debug log for session data

    // Fetch interpretations associated with the logged-in user
    const interpretationData = await Interpretation.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, as: 'creator', attributes: ['name'] }],
    });

    console.log('Raw interpretation data:', interpretationData); // Debug log for raw data

    // Check if any data was returned
    if (interpretationData.length === 0) {
      console.log('No interpretations found for the user');
    }

    // Transform the data to a plain JavaScript object
    const interpretations = interpretationData.map((interpretation) =>
      interpretation.get({ plain: true })
    );

    // Log transformed data
    console.log('Fetched interpretations:', interpretations);

    // Render the template with fetched data
    res.render('insights', {
      interpretations,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error fetching interpretations:', err);
    res.status(500).json({ message: 'Failed to load insights' });
  }
});

// Example route handler to fetch interpretations

router.get('/interpretations', withAuth, (req, res) => renderUserPage(req, res, 'interpretation'));
// Route to render the user's profile
router.get('/profile', withAuth, (req, res) => renderUserPage(req, res, 'profile'));

// Route to render the dashboard page
router.get('/dashboard', withAuth, (req, res) => renderUserPage(req, res, 'dashboard'));

// Route to render the add dream page
router.get('/dreams/add', withAuth, (req, res) => {
    res.render('add-dream', { logged_in: req.session.logged_in });
});

// Route to render the login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        return res.redirect('/profile');
    }

    res.render('login');
});

// Helper function to get user data and render a template
const renderUserPage = async (req, res, template) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Dream, Interpretation }],
        });

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = userData.get({ plain: true });

        res.render(template, {
            ...user,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error(`Error fetching ${template} data:`, err);
        res.status(500).json({ message: `Failed to load ${template}` });
    }
};

module.exports = router;
