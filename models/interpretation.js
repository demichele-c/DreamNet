const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Interpretation extends Model {}

Interpretation.init(
    {
        dreamText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        interpretation: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Interpretation',
    }
);

module.exports = Interpretation;
