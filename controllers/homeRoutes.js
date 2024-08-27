const router = require('express').Router();
const { Dream, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to get the homepage
router.get('/', async (req, res) => {
  try {
    const dreamData = await Dream.findAll({
      include: [{ model: User, attributes: ['name'] }],
    });

    const dreams = dreamData.map((dream) => dream.get({ plain: true }));

    res.render('homepage', { 
      dreams, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a single dream by id
router.get('/dream/:id', async (req, res) => {
  try {
    const dreamData = await Dream.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['name'] }],
    });

    if (!dreamData) {
      return res.status(404).json({ message: 'No dream found with this id!' });
    }

    const dream = dreamData.get({ plain: true });

    res.render('dream', {
      ...dream,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Helper function to get user data and render a template
const renderUserPage = async (req, res, template) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Dream }],
    });

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userData.get({ plain: true });

    res.render(template, {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.error(`Error fetching ${template} data:`, err);
    res.status(500).json({ message: `Failed to load ${template}` });
  }
};

// Route to get the user's profile
router.get('/profile', withAuth, (req, res) => renderUserPage(req, res, 'profile'));

// Route to get the dashboard page
router.get('/dashboard', withAuth, (req, res) => renderUserPage(req, res, 'dashboard'));

// Route to render the add dream page
router.get('/dreams/add', withAuth, (req, res) => {
  res.render('add-dream', { logged_in: true });
});

// Route to render the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/profile');
  }

  res.render('login');
});

// Route to get all dreams (e.g., /dreams)
router.get('/dreams', async (req, res) => {
    try {
      const dreamData = await Dream.findAll({
        include: [{ model: User, attributes: ['name'] }],
      });
  
      const dreams = dreamData.map((dream) => dream.get({ plain: true }));
  
      res.render('dreams', { 
        dreams, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;
