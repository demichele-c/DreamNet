// Import model definitions
const User = require('./user');            // Import the User model
const Dream = require('./dream');          // Import the Dream model
const Interpretation = require('./interpretations'); // Import the Interpretation model

// Define model associations

// Establish a one-to-many relationship between User and Dream
// A user can have many dreams
User.hasMany(Dream, {
  foreignKey: 'user_id', // Foreign key in the Dream model
  onDelete: 'CASCADE'    // If a user is deleted, all associated dreams are also deleted
});

// Define the inverse relationship: a dream belongs to a user
Dream.belongsTo(User, {
  foreignKey: 'user_id', // Foreign key in the Dream model
});

// Establish a one-to-many relationship between User and Interpretation
// A user can have many interpretations
User.hasMany(Interpretation, {
  foreignKey: 'user_id', // Foreign key in the Interpretation model
  onDelete: 'CASCADE',   // If a user is deleted, all associated interpretations are also deleted
});

// Define the inverse relationship: an interpretation belongs to a user
Interpretation.belongsTo(User, {
  foreignKey: 'user_id', // Foreign key in the Interpretation model
});

// Export all models and their associations for use in other parts of the application
module.exports = { User, Dream, Interpretation };
