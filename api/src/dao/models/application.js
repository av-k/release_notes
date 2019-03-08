'use strict';
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('application', {
    name: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        Application.belongsTo(models.user);
        Application.hasMany(models.note);
      }
    }
  });

  return Application;
};
