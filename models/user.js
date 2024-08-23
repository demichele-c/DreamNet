// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   });

//   User.associate = (models) => {
//     User.hasMany(models.Dream, {
//       foreignKey: 'userId',
//       as: 'dreams'
//     });
//   };

//   return User;
// };
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Adjust the path as needed

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = User;
