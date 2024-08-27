//models/interpretations.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Adjust path as needed

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
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Interpretation',
        tableName: 'interpretations',
        timestamps: false,
    }
);

module.exports = Interpretation;
