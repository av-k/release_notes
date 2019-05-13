'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('note', {
    version: {
      type: DataTypes.STRING,
      allowNull: false,
      _filterable: true
    },
    description: DataTypes.STRING,
    published: {
      type: DataTypes.BOOLEAN,
      _filterable: true
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      _filterable: true
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

  /**
   * Get available fields for filters
   * @returns {Array}
   */
  Note.getFilterableFields = function() {
    return Object.keys(this.attributes).reduce((accumulator, attrName) => {
      if (this.attributes[attrName]._filterable) {
        accumulator.push(attrName);
      }
      return accumulator;
    }, ['applicationId', 'userId']);
  };

  /**
   * Prepare `where` param for searching
   * @param request
   * @param options
   * @returns {{}}
   */
  Note.composeWhere = function(request, options = {}) {
    const filterFields = this.getFilterableFields();
    if (options.query) {
      return Object.keys(request.query).reduce((accumulator, field) => {
        if (filterFields.includes(field)) {
          accumulator[field] = request.query[field];
        }
        return accumulator;
      }, {});
    } else {
      return {};
    }
  };

  return Note;
};
