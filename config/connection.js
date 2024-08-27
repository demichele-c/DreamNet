
const Sequelize = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT || 3001,
  logging: false, // Optional: Disable logging for production
  dialectOptions: {
    ssl: {
      require: true, // Ensure SSL is used for secure connections
      rejectUnauthorized: false, // This may be necessary for certain SSL configurations
    },
  },
});

module.exports = sequelize;




