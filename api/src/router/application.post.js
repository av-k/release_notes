'use strict';
import Joi from 'joi';
import _ from 'lodash';
// FIXME - next step > to check headers.Authorization
export default function applicationUpdate(props = {}) {
  const { server } = props;

  async function handler(request, h) {
    const models = _.get(server, 'app.dao._sequelize.models', {});
    const Application = models.application;
    const { id } = request.params;
    const helpers = request.server.app.helpers;
    const fields = ['name', 'updatedAt'];
    const application = await Application.findOne({
      where: { id }
    });

    request.payload.updatedAt = new Date();

    return await application.update(
      helpers.routerPayloadHandler({ request, fields }),
      { fields }
    );
  }

  return {
    method: 'POST',
    path: '/application/{id}',
    config: {
      handler,
      description: 'Update exists applications',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      },
      validate: {
        params: {
          id: Joi.number()
        },
        payload: Joi.object({
          name: Joi.string()
            .required()
        })
      }
    }
  }
}
