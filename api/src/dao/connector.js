'use strict';
import Sequelize from 'sequelize';
import { exec } from 'child_process';
import config from '../config';

class Connector {
  constructor(props = {}) {
    this._Sequelize = Sequelize;
    Object.keys(props).forEach((propName) => {
      this[`_${propName}`] = props[propName];
    });
  }

  init() {
    this._sequelize = new this._Sequelize(config.DB_URL);
  }

  runMigrate() {
    return new Promise((resolve, reject) => {
      const migrate = exec(
        'sequelize db:migrate',
        {env: process.env},
        (err, stdout, stderr) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );

      migrate.stdout.pipe(process.stdout);
      migrate.stderr.pipe(process.stderr);
    });
  }

  runSeed() {
    return new Promise((resolve, reject) => {
      const seek = exec(
        'sequelize db:seed:all',
        {env: process.env},
        (err, stdout, stderr) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );

      seek.stdout.pipe(process.stdout);
      seek.stderr.pipe(process.stderr);
    });
  }

  test() {
    return this._sequelize.authenticate();
  }
}

export default Connector;
