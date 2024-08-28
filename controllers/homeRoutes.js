// Import the necessary modules
const router = require('express').Router();
const { Dream, User, Interpretation } = require('../models'); // Import models to interact with the database
const withAuth = require('../utils/auth'); // Import authentication middleware

// Route to get the initial homepage or redirect based on login status
router.get('/', async (req, res) => {
    try {
        if (req.session.logged_in) {
            // If the user is logged in, redirect to the dashboard
            res.redirect('/dashboard'); 
        } else {
            // If the user is not logged in, render the homepage
            res.render('homepage', {
                logged_in: req.session.logged_in // Pass logged_in status to the template
            });
        }
    } catch (err) {
        console.error('Error in / route:', err); // Log error to the console
        res.status(500).json(err); // Send a 500 error response if something goes wrong
    }
});

// Route to get all dreams for the logged-in user
router.get('/dreams', withAuth, async (req, res) => {
    try {
        const dreamData = await Dream.findAll({
            where: { user_id: req.session.user_id }, // Find dreams associated with the logged-in user
            include: [{ model: User, attributes: ['name'] }], // Include associated user data
        });

        // Map the dream data to plain objects
        const dreams = dreamData.map((dream) => dream.get({ plain: true }));

        // Render the dreams page with the retrieved dream data
        res.render('dreams', { 
            name: req.session.name, // Pass the user's name to the template
            dreams, // Pass the dream data to the template
            logged_in: req.session.logged_in, // Pass logged_in status to the template
        });
    } catch (err) {
        console.error('Error in /dreams route:', err); // Log error to the console
        res.status(500).json(err); // Send a 500 error response if something goes wrong
    }
});

// Route to get a single dream by id
router.get('/dream/:id', async (req, res) => {
    try {
        const dreamData = await Dream.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['name'] }], // Include associated user data
        });

        if (!dreamData) {
            res.status(404).json({ message: 'No dream found with this id!' }); // Respond with a 404 if no dream is found
            return;
        }

        const dream = dreamData.get({ plain: true }); // Convert dream data to plain object

        // Render the dream-detail page with the retrieved dream data
        res.render('dream-detail', { 
            dream,
            logged_in: req.session.logged_in // Pass logged_in status to the template
        });
    } catch (err) {
        console.error('Error in /dream/:id route:', err); // Log error to the console
        res.status(500).json(err); // Send a 500 error response if something goes wrong
    }
});

// Route to get insights for the logged-in user
router.get('/insights', withAuth, async (req, res) => {
    try {
        console.log('User ID from session:', req.session.user_id); // Debug log for session data

        // Fetch interpretations associated with the logged-in user
        const interpretationData = await Interpretation.findAll({
            where: { user_id: req.session.user_id }, // Find interpretations by user ID
            include: [{ model: User, as: 'creator', attributes: ['name'] }], // Include user data with alias 'creator'
        });

        console.log('Raw interpretation data:', interpretationData); // Debug log for raw data

        if (interpretationData.length === 0) {
            console.log('No interpretations found for the user'); // Log if no interpretations are found
        }

        // Transform the data to a plain JavaScript object
        const interpretations = interpretationData.map((interpretation) =>
            interpretation.get({ plain: true })
        );

        console.log('Fetched interpretations:', interpretations); // Log transformed data

        // Render the insights page with the fetched interpretation data
        res.render('insights', {
            interpretations, // Pass the interpretation data to the template
            logged_in: req.session.logged_in, // Pass logged_in status to the template
        });
    } catch (err) {
        console.error('Error fetching interpretations:', err); // Log error to the console
        res.status(500).json({ message: 'Failed to load insights' }); // Send a 500 error response if something goes wrong
    }
});

// Route handler to fetch interpretations and render the page (Example)
router.get('/interpretations', withAuth, (req, res) => renderUserPage(req, res, 'interpretation'));

// Route to render the user's profile page
router.get('/profile', withAuth, (req, res) => renderUserPage(req, res, 'profile'));

// Route to render the dashboard page
router.get('/dashboard', withAuth, (req, res) => renderUserPage(req, res, 'dashboard'));

// Route to render the add dream page
router.get('/dreams/add', withAuth, (req, res) => {
    res.render('add-dream', { logged_in: req.session.logged_in }); // Pass logged_in status to the template
});

// Route to render the login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        return res.redirect('/profile'); // Redirect to profile if user is already logged in
    }

    res.render('login'); // Render the login page
});

// Helper function to get user data and render a specified template
const renderUserPage = async (req, res, template) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }, // Exclude password from user data
            include: [{ model: Dream, Interpretation }], // Include related dreams and interpretations
        });

        if (!userData) {
            return res.status(404).json({ message: 'User not found' }); // Respond with 404 if user not found
        }

        const user = userData.get({ plain: true }); // Convert user data to plain object

        // Render the specified template with user data
        res.render(template, {
            ...user, // Spread user data into the template
            logged_in: req.session.logged_in, // Pass logged_in status to the template
        });
    } catch (err) {
        console.error(`Error fetching ${template} data:`, err); // Log error to the console
        res.status(500).json({ message: `Failed to load ${template}` }); // Send a 500 error response if something goes wrong
    }
};

// Export the router to be used in other parts of the application
module.exports = router;
