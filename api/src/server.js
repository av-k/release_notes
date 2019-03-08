'use strict';
import Hapi from 'hapi';
import config from './config';
import boot from './boot';

// Configurations
const server = Hapi.server({
  host: config.HOST,
  port: config.PORT
});

// Start up
const start = async function() {
  try {
    await boot({server});
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running a %s, in %s mode', server.info.uri, config.NODE_ENV);
};

//
start();
