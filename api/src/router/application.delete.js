'use strict';
import Joi from 'joi';
import _ from 'lodash';

export default function home(props = {}) {
  const { server } = props;

  async function handler(request, h) {
    const models = _.get(server, 'app.dao._sequelize.models', {});
    const Application = models.application;
    const { id } = request.params;

    return await Application.destroy({ where: { id } });
  }

  return {
    method: 'DELETE',
    path: '/application/{id}',
    config: {
      handler,
      description: 'Delete exists application',
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.number()
        })
      }
    }
  }
}
