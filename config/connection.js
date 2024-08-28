const Sequelize = require('sequelize');
require('dotenv').config(); // Ensure environment variables are loaded

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', // Explicitly specify the dialect
    port: process.env.DB_PORT
  }
);

module.exports = sequelize;