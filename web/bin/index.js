'use strict';
const env = require('./env');

module.exports = {
  isPROD: env.NODE_ENV === 'production',
  ...env
};
