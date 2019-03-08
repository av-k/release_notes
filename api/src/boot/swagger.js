'use strict';
import Vision from 'vision';
import Inert from 'inert';
import Blipp from 'blipp';
import HapiSwagger from 'hapi-swagger';

import config from '../config';
import Pack from '../../package';

/**
 * Router Initialization
 * @param props
 */
export async function run(props = {}) {
  const { server } = props;
  const swaggerOptions = {
    basePath: '/v1',
    pathPrefixSize: 2,
    documentationPath: '/documentation',
    info: {
      title: 'API Documentation',
      version: Pack.version
    },
    jsonEditor: true,
    documentationPage: !config.isPROD,
    debug: !config.isPROD
  };

  await server.register([
    Inert,
    Vision,
    Blipp,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);
}
