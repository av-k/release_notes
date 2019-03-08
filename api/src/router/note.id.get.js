'use strict';
import _ from 'lodash';
import Joi from 'joi';

export default function home(props = {}) {
  const { server } = props;

  async function handler(request, h) {
    const models = _.get(server, 'app.dao._sequelize.models', {});
    const Note = models.note;
    const { id } = request.params;

    return await Note.findOne({
      where: { id }
    });
  }

  return {
    method: 'GET',
    path: '/note/{id}',
    config: {
      handler,
      description: 'Get release note by id',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      },
      validate: {
        params: {
          id: Joi.number()
        }
      }
    }
  }
}
