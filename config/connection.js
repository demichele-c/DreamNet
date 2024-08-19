const Sequelize = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres', // Specify the dialect explicitly
    port: 5432,
  }
);

module.exports = sequelize;
