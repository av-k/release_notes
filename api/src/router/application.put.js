'use strict';
import Joi from 'joi';
import _ from 'lodash';

export default function home(props = {}) {
  const { server } = props;

  async function handler(request, h) {
    const models = _.get(server, 'app.dao._sequelize.models', {});
    const Application = models.application;
    const helpers = request.server.app.helpers;
    const fields = ['name', 'userId', 'createdAt', 'updatedAt'];

    request.payload.userId = 1; // must be obtained from accessToken
    request.payload.createdAt = new Date();
    request.payload.updatedAt = new Date();

    return await Application.create(helpers.routerPayloadHandler({ request, fields }));
  }

  return {
    method: 'PUT',
    path: '/application/create',
    config: {
      handler,
      description: 'Create new applications',
      notes: 'Create new application instance',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      },
      validate: {
        payload: Joi.object({
          name: Joi.string()
            .required()
        })
      }
    }
  }
}
