'use strict';
const defaultEnvVariables = {
  NODE_ENV: 'development',
  HOST: '0.0.0.0',
  PORT: 3050,
  WEB_APP_PREFIX: 'AP',
  API_HOST: '0.0.0.0',
  API_PORT: '3010',
  API_VERSION: 1
};
const envVariables = Object.keys(process.env).reduce((accumulator, envName) => {
  if (Object.keys(defaultEnvVariables).includes(envName)) {
    accumulator[envName] = process.env[envName];
  }

  return accumulator;
}, {});

module.exports = {
  ...defaultEnvVariables,
  ...envVariables
};
