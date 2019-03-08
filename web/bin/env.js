'use strict';
const defaultEnvVariables = {
  NODE_ENV: 'development',
  HOST: 'localhost',
  PORT: 3000,
  WEB_APP_PREFIX: 'AP'
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
