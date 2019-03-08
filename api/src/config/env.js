'use strict';
const defaultEnvVariables = {
  NODE_ENV: 'development',
  HOST: 'localhost',
  PORT: 3010,
  DB_HOST: '0.0.0.0',
  DB_NAME: 'adnotes',
  DB_USERNAME: 'adnotes',
  DB_PASSWORD: 'adnotes',
  DB_DIALECT: 'postgres',
  DB_POOL: {
    max: 5,
    min: 0,
    idle: 20000
  }
};
const envVariables = Object.keys(process.env).reduce((accumulator, envName) => {
  if (Object.keys(defaultEnvVariables).includes(envName)) {
    accumulator[envName] = process.env[envName];
  }

  return accumulator;
}, {});

export default {
  ...defaultEnvVariables,
  ...envVariables
};
