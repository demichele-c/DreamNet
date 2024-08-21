module.exports = (sequelize, DataTypes) => {
  const Dream = sequelize.define('Dream', {
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
        model: 'Users',
        key: 'id'
      }
    }
  });

  Dream.associate = (models) => {
    Dream.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Dream.hasMany(models.Insight, {
      foreignKey: 'dreamId',
      as: 'insights'
    });
  };

  return Dream;
};
