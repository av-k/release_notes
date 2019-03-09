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
    use_env_variable: 'DB_URL',
    dialect: config.DB_DIALECT
  }
};
