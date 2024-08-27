//models/index.js

const User = require('./user');
const Dream = require('./dream');
const Interpretation = require('./interpretations');

// Only keep these associations if they are needed for your application
User.hasMany(Dream, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Dream.belongsTo(User, {
  foreignKey: 'user_id'
});

// Removed associations with Interpretation
// User.hasMany(Interpretation, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE',
// });

// Interpretation.belongsTo(User, {
//   foreignKey: 'user_id',
// });

module.exports = { User, Dream, Interpretation };
