'use strict';
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('application', {
    name: {
      type: DataTypes.INTEGER,
      allowNull: false,
      _filterable: true
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
        Application.belongsTo(models.user);
        Application.hasMany(models.note);
      }
    }
  });

  /**
   * Get available fields for filters
   * @returns {Array}
   */
  Application.getFilterableFields = function() {
    return Object.keys(this.attributes).reduce((accumulator, attrName) => {
      if (this.attributes[attrName]._filterable) {
        accumulator.push(attrName);
      }
      return accumulator;
    }, []);
  };

  /**
   * Prepare `where` param for searching
   * @param request
   * @param options
   * @returns {{}}
   */
  Application.composeWhere = function(request, options = {}) {
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

  return Application;
};
