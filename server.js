// Import required modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers'); // Import the routes from the controllers directory
const helpers = require('./utils/helpers'); // Import Handlebars helpers

const sequelize = require('./config/connection'); // Import Sequelize instance
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Import session store for Sequelize

const app = express(); // Initialize Express application
const PORT = process.env.PORT || 5432; // Set the port for the server

// Create Handlebars instance with custom helpers
const hbs = exphbs.create({ helpers });

// Session configuration
const sess = {
    secret: process.env.SESSION_SECRET, // Secret key for signing the session ID cookie
    cookie: {
        maxAge: 300000, // Cookie expiration time set to 5 minutes
        httpOnly: true, // Cookie cannot be accessed via JavaScript
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: 'strict', // Cookie will only be sent for same-site requests
    },
    resave: false, // Do not save session if unmodified
    saveUninitialized: true, // Save new sessions to the store
    store: new SequelizeStore({
        db: sequelize // Use Sequelize as the session store
    })
};

// Initialize session middleware with the defined configuration
try {
    app.use(session(sess));
} catch (error) {
    console.error('Session setup error:', error); // Log error if session setup fails
}

// Set up Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use imported routes for handling requests
app.use(routes);

// Synchronize Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('We are live!')); // Start the server and log a message
});
