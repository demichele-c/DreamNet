// Import the Router method from Express
const router = require('express').Router();
// Import the Dream and User models
const { Dream, User } = require('../../models');
// Import the authentication middleware to protect routes
const withAuth = require('../../utils/auth');

// Route to render the add dream page
router.get('/add', (req, res) => {
  console.log('GET /dreams/add route hit'); // Log to console for debugging
  res.render('add-dream', {
    logged_in: true, // Pass the logged-in status to the template
  });
});

// Route to create a new dream
// Protected by withAuth middleware to ensure the user is logged in
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new dream using data from the request body and the logged-in user's ID
    const newDream = await Dream.create({
      ...req.body, // Spread the properties from the request body
      user_id: req.session.user_id, // Set the user_id from the session
    });

    // Respond with the new dream data in JSON format
    res.status(200).json(newDream);
  } catch (err) {
    // If there's an error, respond with a 400 status and the error message
    res.status(400).json(err);
  }
});

// Route to get all dreams for the logged-in user
// Protected by withAuth middleware
router.get('/', withAuth, async (req, res) => {
  try {
    // Find all dreams that belong to the logged-in user
    const dreams = await Dream.findAll({
      where: {
        user_id: req.session.user_id, // Filter dreams by the current user's ID
      },
    });

    // Render the 'dreams' template, passing the dreams data and logged-in status
    res.render('dreams', { 
      dreams: dreams.map(dream => dream.get({ plain: true })), // Convert each dream instance to plain object
      logged_in: req.session.logged_in // Pass the logged-in status to the template
    });
  } catch (err) {
    // If there's an error, respond with a 500 status and the error message
    res.status(500).json(err);
  }
});

// Route to get a single dream by id for editing
// Protected by withAuth middleware
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // Find a dream by its primary key (id)
    const dreamData = await Dream.findByPk(req.params.id);

    // If no dream is found, respond with a 404 status and a message
    if (!dreamData) {
      res.status(404).json({ message: 'No dream found with this id!' });
      return;
    }

    // Convert the dream instance to a plain object
    const dream = dreamData.get({ plain: true });

    // Render the 'edit-dream' template, passing the dream data and logged-in status
    res.render('edit-dream', {
      ...dream, // Spread the dream data into the template
      logged_in: req.session.logged_in // Pass the logged-in status to the template
    });
  } catch (err) {
    // If there's an error, respond with a 500 status and the error message
    res.status(500).json(err);
  }
});

// Route to update a dream by id
// Protected by withAuth middleware
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update the dream data using the request body and filter by id and user_id
    const [updated] = await Dream.update(req.body, {
      where: {
        id: req.params.id, // ID from the route parameter
        user_id: req.session.user_id, // Ensure it belongs to the logged-in user
      },
    });

    // If no rows are updated, respond with a 404 status and a message
    if (!updated) {
      res.status(404).json({ message: 'No dream found with this id!' });
      return;
    }

    // If update is successful, respond with a success message
    res.status(200).json({ message: 'Dream updated successfully!' });
  } catch (err) {
    // If there's an error, respond with a 500 status and the error message
    res.status(500).json(err);
  }
});

// Route to delete a dream by id
// Protected by withAuth middleware
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete the dream by filtering with id and user_id
    const dreamData = await Dream.destroy({
      where: {
        id: req.params.id, // ID from the route parameter
        user_id: req.session.user_id, // Ensure it belongs to the logged-in user
      },
    });

    // If no rows are deleted, respond with a 404 status and a message
    if (!dreamData) {
      res.status(404).json({ message: 'No dream found with this id!' });
      return;
    }

    // If deletion is successful, respond with the deleted dream data
    res.status(200).json(dreamData);
  } catch (err) {
    // If there's an error, respond with a 500 status and the error message
    res.status(500).json(err);
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
