'use strict';
import _ from 'lodash';
import Joi from 'joi';

export default function home(props = {}) {
  const { server } = props;

  async function handler(request, h) {
    const models = _.get(server, 'app.dao._sequelize.models', {});
    const Application = models.application;
    const User = models.user;
    const Note = models.note;
    const { id } = request.params;

    return await Application.findOne({
      where: { id },
      include: [
        { model: User },
        { model: Note }
      ]
    });
  }

  return {
    method: 'GET',
    path: '/application/{id}',
    config: {
      handler,
      description: 'Get application by id',
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
