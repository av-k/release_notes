'use strict';
import config from '../config';

module.exports = {
  development: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
    pool: config.DB_POOL
  },
  production: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
    pool: config.DB_POOL
  }
};
