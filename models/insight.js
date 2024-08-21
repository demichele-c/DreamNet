module.exports = (sequelize, DataTypes) => {
  const Insight = sequelize.define('Insight', {
    insight: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dreamId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Dreams',
        key: 'id'
      }
    }
  });

  Insight.associate = (models) => {
    Insight.belongsTo(models.Dream, {
      foreignKey: 'dreamId',
      as: 'dream'
    });
  };

  return Insight;
};
