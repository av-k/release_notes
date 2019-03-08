'use strict';
import * as db from './db';
import * as router from './router';
import * as swagger from './swagger';

export default async function(props = {}) {
  const { server } = props;

  server.app.helpers = {};

  await db.run({ dir: '../dao', server });
  await router.run({ dir: '../router', server });
  await swagger.run({ server });
}
