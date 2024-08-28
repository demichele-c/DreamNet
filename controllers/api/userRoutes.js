// Import the Router method from Express to create a new router instance
const router = require('express').Router();
// Import the User model to interact with the User table in the database
const { User } = require('../../models');

// Route to create a new user (sign up)
router.post('/', async (req, res) => {
  try {
    // Use the User model to create a new user with the data sent in the request body
    const userData = await User.create(req.body);

    // Save the user ID and logged-in status to the session
    req.session.save(() => {
      req.session.user_id = userData.id; // Store the user's ID in the session
      req.session.logged_in = true; // Set the logged-in status to true

      // Respond with the user data in JSON format
      res.status(200).json(userData);
    });
  } catch (err) {
    // If there's an error (e.g., validation error), respond with a 400 status and the error message
    res.status(400).json(err);
  }
});

// Route to log in an existing user
router.post('/login', async (req, res) => {
  try {
    // Find a user by their username from the request body
    const userData = await User.findOne({ where: { userName: req.body.userName } });

    // If no user is found, respond with a 400 status and a message
    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Check if the provided password matches the hashed password in the database
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is invalid, respond with a 400 status and a message
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Save the user ID and logged-in status to the session
    req.session.save(() => {
      req.session.user_id = userData.id; // Store the user's ID in the session
      req.session.logged_in = true; // Set the logged-in status to true
      
      // Respond with the user data and a success message
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    // If there's an error, respond with a 400 status and the error message
    res.status(400).json(err);
  }
});

// Route to log out the current user
router.post('/logout', (req, res) => {
  // Check if the user is currently logged in
  if (req.session.logged_in) {
    // Destroy the session to log out the user
    req.session.destroy(() => {
      res.status(204).end(); // Respond with a 204 No Content status
    });
  } else {
    // If the user is not logged in, respond with a 404 status
    res.status(404).end();
  }
});

// Export the router so it can be used in other parts of the application
module.exports = router;
