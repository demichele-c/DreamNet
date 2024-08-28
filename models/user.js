// Import required modules and classes
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const sequelize = require('../config/connection'); // Import the Sequelize instance

// Define the User model by extending Sequelize's Model class
class User extends Model {
  // Method to check if the provided password matches the hashed password
  checkPassword(loginPW) {
    return bcrypt.compareSync(loginPW, this.password);
  }
}

// Initialize the User model with its schema and configurations
User.init(
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
    // Define the 'userName' field as a string, not nullable, and unique
    // Validation rules: length between 4 and 20 characters, alphanumeric with underscores
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 20], // Length validation rule
        is: /^[a-zA-Z0-9_]+$/i // Regex validation for alphanumeric and underscore
      }
    },
    // Define the 'password' field as a string and not nullable
    // Validation rule: minimum length of 8 characters
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Minimum length validation
      },
    },
  },
  {
    // Hooks to handle password hashing before creating or updating a user
    hooks: {
      // Hash the password before creating a new user
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Hash the password before updating an existing user
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,         // Pass the Sequelize instance to the model
    timestamps: false, // Disable automatic timestamps (createdAt, updatedAt)
    freezeTableName: true, // Use the exact table name defined in the model (i.e., 'User')
    underscored: true,     // Convert camelCase column names to snake_case (e.g., 'user_name')
    modelName: 'User',     // Define the model name as 'User'
  }
);

// Export the User model for use in other parts of the application
module.exports = User;
