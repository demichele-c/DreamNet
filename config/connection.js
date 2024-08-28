const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
    // Use the DB_URL environment variable for production
    sequelize = new Sequelize(process.env.DB_URL, {
        dialect: 'postgres',
        logging: false // Optional: Disable logging if not needed
    });
} else {
    // Fallback configuration for local development
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST || ‘localhost’,
            dialect: ‘postgres’,
            port: process.env.DB_PORT || 5432,
            logging: false,
        }
    );
}

module.exports = sequelize;
