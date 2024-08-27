// models/interpretation.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user'); // Import User model

class Interpretation extends Model {}

Interpretation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    dream_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    interpretation_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Interpretation',
  }
);

// Define associations
Interpretation.belongsTo(User, { as: 'creator', foreignKey: 'user_id' });
User.hasMany(Interpretation, { as: 'interpretations', foreignKey: 'user_id' });

module.exports = Interpretation;
