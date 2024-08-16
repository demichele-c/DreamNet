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
    return Insight;
  };
  