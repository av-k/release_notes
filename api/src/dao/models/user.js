'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        User.hasMany(models.application);
        User.hasMany(models.note);
      }
    }
  });

  return User;
};
