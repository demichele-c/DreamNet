const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => { console.log ("register user")
  try {
    const { username, password } = req.body;

    // Validate request data
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }
console.log ("---")
    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map(err => err.message).join(', ') });
    }
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Received login request with:', { username, password });

    const user = await User.findOne({ where: { username } });
    console.log('User found:', user);

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user.id;
      console.log('Login successful for user:', user.username);
      res.status(200).json({ message: 'Logged in successfully', redirect: '/dashboard' });
    } else {
      console.log('Invalid credentials for user:', username);
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ error: 'Failed to log out' });
    }
    res.redirect('/login');
  });
};
