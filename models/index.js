const Sequelize = require('sequelize');
const sequelize = require('../config/connection'); // Ensure this is correctly exporting a Sequelize instance

// Import models
const User = require('./user');
const Dream = require('./dream');
const Insight = require('./insight');

//const User = UserModel(sequelize, Sequelize.DataTypes);
//const Dream = DreamModel(sequelize, Sequelize.DataTypes);
//const Insight = InsightModel(sequelize, Sequelize.DataTypes);

// Associate models if needed (example)
// User.hasMany(Dream);
// Dream.belongsTo(User);

// Export models and Sequelize instance
module.exports = {
  User,
  Dream,
  Insight,
};
