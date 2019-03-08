'use strict';
import Sequelize from 'sequelize';
import config from '../config';

class Connector {
  constructor(props = {}) {
    this._Sequelize = Sequelize;
    Object.keys(props).forEach((propName) => {
      this[`_${propName}`] = props[propName];
    });
  }

  init() {
    this._sequelize = new this._Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
      host: config.DB_HOST,
      dialect: config.DB_DIALECT,
      pool: {
        max: 5,
        min: 0,
        idle: 20000,
        ...config.DB_POOL
      },
    })
  }

  test() {
    return this._sequelize.authenticate();
  }
}

export default Connector;
