const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers'); // Import routes
const helpers = require('./utils/helpers'); // Import Handlebars helpers

const sequelize = require('./config/connection'); // Import Sequelize instance
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Import session store for Sequelize

const app = express(); // Initialize Express app
const port = process.env.PORT || 3000; // Default to 3000 or use PORT from environment

// Create Handlebars instance with custom helpers
const hbs = exphbs.create({ helpers });

// Session configuration
const sess = {
    secret: process.env.SESSION_SECRET || 'default_secret', // Provide a default secret for local development
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
app.use(session(sess));

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

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
    app.listen(port, '0.0.0.0', () => { // Binding to '0.0.0.0' is important for Render
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => {
    console.error('Failed to sync database:', error);
});
