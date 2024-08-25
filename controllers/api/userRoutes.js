const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        // Ensure req.body contains necessary fields
        const { userName, password, name } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check if the username already exists
        const existingUser = await User.findOne({ where: { user_name: userName } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            name,
            user_name: userName,
            password: hashedPassword
        });

        // Save the session
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.status(201).json(newUser);
        });
    } catch (err) {
        console.error('Error creating user:', err); // Enhanced debugging
        res.status(500).json({ message: 'Failed to create user', error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { user_name: req.body.userName } });

        if (!userData) {
            return res.status(400).json({ message: 'Incorrect username or password, please try again' });
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect username or password, please try again' });
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

  router.post('/logout', (req, res) => {
    if (req.sessionID.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
  });

  module.exports = router;