const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres', // Specify your database dialect here
  port: process.env.DB_PORT, // Specify your database port
});

module.exports = sequelize;
