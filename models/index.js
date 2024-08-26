const User = require('./user');
const Dream = require('./dream');
const Interpretations = require('./interpretations');

User.hasMany(Dream, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Dream.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Dream , Interpretations };
