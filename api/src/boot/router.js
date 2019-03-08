'use strict';
import path from 'path';
import glob from 'glob';
import pagination from 'hapi-pagination';

/**
 *
 * @param props
 */
function payloadHandler(props = {}) {
  const { request, fields } = props;
  const payload = Object.keys(request.payload).reduce((accumulator, field) => {
    if (!!~fields.indexOf(field)) {
      accumulator[field] = request.payload[field];
    }
    return accumulator;
  }, {});

  return payload;
}

/**
 *
 * @param props
 */
function extendWithHelpers(props = {}) {
  const { server } = props;
  server.app.helpers.routerPayloadHandler = payloadHandler;
}

function bindResponsesPagination(props = {}) {
  const { server } = props;
  const options = {
    query: {
      page: {
        name: 'page',
        default: 0
      },
      limit: {
        name: 'limit',
        default: 10
      },
      pagination: {
        name: 'pagination',
        default: true,
        active: true
      },
      invalid: 'defaults'
    },
    routes: {
      include: ['*'],
      exclude: []
    }
  };
  server.register(pagination, options);
}

/**
 * Router Initialization
 * @param props
 */
export async function run(props = {}) {
  const { dir, server } = props;
  const normalizedPath = path.join(__dirname, dir);


  server.realm.modifiers.route.prefix = '/v1';
  bindResponsesPagination({ server });
  extendWithHelpers({ server });

  glob.sync(`${normalizedPath}/*.js`).forEach((filePath) => {
    server.route(require(path.resolve(filePath)).default({ server }));
  });
}
