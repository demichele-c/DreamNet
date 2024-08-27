const router = require('express').Router();
const { Dream , User , Interpretations } = require('../models');
const withAuth = require('../utils/auth');+

router.get('/', async (req, res) => {
  try {
    
    const dreamData = await Dream.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const dreams = dreamData.map((dream) => dream.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      dreams, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/interpretation', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const interpretationData = await Interpretations.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const interpretationsArray = interpretationData.map((Interpretation) => Interpretation.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('interpretation', { 
      interpretationsArray, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dream/:id', async (req, res) => {
  try {
    const dreamData = await Dream.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    
    const dream = dreamData.get({ plain: true });

    res.render('dream', {
      ...dream,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Dream }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// Use withAuth middleware to prevent access to route
router.get('/dreams', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Dream }],
    });

    const user = userData.get({ plain: true });

    res.render('dreams', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Add this route to render the add dream form
router.get('/dreams/add', withAuth, (req, res) => {
  res.render('add-dream', {
    logged_in: true
  });
});
// Route to get the dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Fetch data relevant to the dashboard
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Dream }],
    });

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userData.get({ plain: true });

    // Render the dashboard view with the user data
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error('Error fetching dashboard data:', err); // Improved error logging
    res.status(500).json({ message: 'Failed to load dashboard' }); // User-friendly error message
  }
});

module.exports = router;
