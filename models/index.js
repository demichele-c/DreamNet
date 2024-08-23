const Sequelize = require('sequelize');
const sequelize = require('../config/connection'); // Ensure this is correctly exporting a Sequelize instance

// Import models
const User = require('./user');
const Dream = require('./dream');
const Insight = require('./insight');
const Interpretation = require('./interpretations')
//const User = UserModel(sequelize, Sequelize.DataTypes);
//const Dream = DreamModel(sequelize, Sequelize.DataTypes);
//const Insight = InsightModel(sequelize, Sequelize.DataTypes);

// Associate models if needed (example)
User.hasMany(Dream, {
  foreignKey: "userId"
});
// Dream.belongsTo(User);
Dream.belongsTo(User, {
  foreignKey: "userId"
})
// Export models and Sequelize instance
module.exports = {
  User,
  Dream,
  Insight,
  Interpretation,
};
