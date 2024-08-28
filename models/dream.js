// Import required modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Dream model, extending Sequelize's Model class
class Dream extends Model {}

// Initialize the Dream model with its schema
Dream.init(
  {
    // Define the 'id' field as an integer, which is not nullable,
    // serves as the primary key, and auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the 'name' field as a string and not nullable
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the 'description' field as a string, which is nullable
    description: {
      type: DataTypes.STRING,
    },
    // Define the 'date_created' field as a date, not nullable,
    // with a default value of the current date and time
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    freezeTableName: true, // Use the exact table name defined in the model (i.e., 'Dream')
    underscored: true,     // Convert camelCase column names to snake_case (e.g., 'date_created')
    modelName: 'Dream',    // Define the model name as 'Dream'
  }
);

// Export the Dream model for use in other parts of the application
module.exports = Dream;
