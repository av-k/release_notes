'use strict';
import path from 'path';
import glob from 'glob';
import _ from 'lodash';

import { Connector } from '../dao';

/**
 * Database Initialization
 * @param props
 * @returns {Promise<void>}
 */
export async function run(props = {}) {
  const { dir, server } = props;
  const normalizedPath = path.join(__dirname, dir);

  server.app.dao = new Connector();
  server.app.dao.init();

  // Connection Test
  try {
    await server.app.dao.test();
    console.info('DB:TEST:OK!');
    // Run Tasks
    await server.app.dao.runMigrate();
    await server.app.dao.runSeed();
  } catch(error) {
    console.info('DB:TEST:ERROR: ', error);
  }

  // Bind Models
  glob.sync(`${normalizedPath}/models/*.js`).forEach((filePath) => {
    server.app.dao._sequelize.import(filePath);
  });

  const models = _.get(server, 'app.dao._sequelize.models', {});
  Object.keys(models).forEach((modelName) => {
    const associate = _.get(models[modelName], 'options.classMethods.associate');
    if (associate) {
      associate(models);
    }
  });
}
