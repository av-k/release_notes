'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('note', {
    version: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: DataTypes.STRING,
    published: DataTypes.BOOLEAN,
    releaseDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        Note.belongsTo(models.application);
        Note.belongsTo(models.user);
      }
    }
  });

  return Note;
};
