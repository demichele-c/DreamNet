// Import the Sequelize library for interacting with the PostgreSQL database
const Sequelize = require('sequelize');

// Load environment variables from a .env file into process.env
require('dotenv').config();

// Declare a variable to hold the Sequelize instance
let sequelize;

// Check if the DB_URL environment variable is set (typically for production)
if (process.env.DB_URL) {
    // Initialize Sequelize with the database URL for the production environment
    sequelize = new Sequelize(process.env.DB_URL, {
        dialect: 'postgres', // Specify the type of database (PostgreSQL)
        logging: false // Optional: Disable SQL query logging in the console
    });
} else {
    // Fallback configuration for local development
    // Initialize Sequelize with individual database settings
    sequelize = new Sequelize(
        process.env.DB_NAME,   // Database name from environment variable
        process.env.DB_USER,   // Database user from environment variable
        process.env.DB_PASSWORD, // Database password from environment variable
        {
            host: 'localhost', // Host for local development (default is localhost)
            dialect: 'postgres', // Specify the type of database (PostgreSQL)
            port: process.env.DB_PORT || 5432, // Use DB_PORT env variable or default to 5432
            logging: false // Optional: Disable SQL query logging in the console
        }
    );
}

// Export the configured Sequelize instance for use in other parts of the application
module.exports = sequelize;
