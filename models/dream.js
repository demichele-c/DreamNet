const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Dream extends Model {}
 Dream.init( {
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tags: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }},
    },
    {
      sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Dream',
    });

  module.exports = Dream;
