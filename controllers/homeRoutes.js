const router = require('express').Router();
<<<<<<< HEAD
const { Dream , User , Interpretations } = require('../models');
const withAuth = require('../utils/auth');+
=======
const { Dream, User } = require('../models');
const withAuth = require('../utils/auth');
>>>>>>> 7f5b7a0ab973c7ff59ae667ad91f7b98489a113e

// Route to get the homepage
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

<<<<<<< HEAD
router.get('/interpretation', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const interpretationData = await Interpretations.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
=======
router.get('/dreams', withAuth, async (req, res) => {
  try {
    // Find the logged-in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Dream,
          attributes: ['name', 'description', 'date_created'],
>>>>>>> 7f5b7a0ab973c7ff59ae667ad91f7b98489a113e
        },
      ],
    });

<<<<<<< HEAD
    // Serialize data so the template can read it
    const interpretationsArray = interpretationData.map((Interpretation) => Interpretation.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('interpretation', { 
      interpretationsArray, 
      logged_in: req.session.logged_in 
=======
    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const user = userData.get({ plain: true });

    // Pass the user and dreams data to the Handlebars template
    res.render('dreams', {
      ...user,
      dreams: user.Dreams, // Pass dreams data here
      logged_in: true,
>>>>>>> 7f5b7a0ab973c7ff59ae667ad91f7b98489a113e
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

<<<<<<< HEAD
=======

// Route to get a single dream by id
>>>>>>> 7f5b7a0ab973c7ff59ae667ad91f7b98489a113e
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

<<<<<<< HEAD
    
=======
    if (!dreamData) {
      res.status(404).json({ message: 'No dream found with this id!' });
      return;
    }

>>>>>>> 7f5b7a0ab973c7ff59ae667ad91f7b98489a113e
    const dream = dreamData.get({ plain: true });

    res.render('dream', {
      ...dream,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get the user's profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Dream }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get the dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Dream }],
    });

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ message: 'Failed to load dashboard' });
  }
});

// Route to render the add dream page
router.get('/dreams/add', withAuth, (req, res) => {
  res.render('add-dream', {
    logged_in: true, // Indicating the user is logged in
  });
});

// Route to render the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
