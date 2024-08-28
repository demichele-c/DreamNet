// Import required modules and models
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user'); // Import the User model for associations

// Define the Interpretation model, extending Sequelize's Model class
class Interpretation extends Model {}

// Initialize the Interpretation model with its schema
Interpretation.init(
  {
    // Define the 'id' field as an integer, which is not nullable,
    // serves as the primary key, and auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the 'dream_description' field as text and not nullable
    dream_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Define the 'interpretation_text' field as text and not nullable
    interpretation_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Define the 'user_id' field as an integer that references the 'id' field of the 'User' model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User', // Specifies the referenced model
        key: 'id',    // Specifies the referenced key in the 'User' model
      },
    },
  },
  {
    sequelize,         // Pass the Sequelize instance to the model
    timestamps: false, // Disable automatic timestamps (createdAt, updatedAt)
    freezeTableName: true, // Use the exact table name defined in the model (i.e., 'Interpretation')
    underscored: true,     // Convert camelCase column names to snake_case (e.g., 'dream_description')
    modelName: 'Interpretation', // Define the model name as 'Interpretation'
  }
);

// Define model associations

// Define the association: Interpretation belongs to User
// This means each interpretation is created by a single user
Interpretation.belongsTo(User, { 
  as: 'creator',      // Alias for the association (optional but useful for clarity)
  foreignKey: 'user_id', // Foreign key in the Interpretation model
});

// Define the reverse association: User has many Interpretations
// This means a user can have multiple interpretations
User.hasMany(Interpretation, { 
  as: 'interpretations', // Alias for the association (optional but useful for clarity)
  foreignKey: 'user_id',  // Foreign key in the Interpretation model
});

// Export the Interpretation model for use in other parts of the application
module.exports = Interpretation;
