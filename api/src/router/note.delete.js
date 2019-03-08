'use strict';
import Joi from 'joi';
import _ from 'lodash';
// FIXME - next step > to check headers.Authorization
export default function noteDelete(props = {}) {
  const { server } = props;

  async function handler(request, h) {
    const models = _.get(server, 'app.dao._sequelize.models', {});
    const Note = models.note;
    const { id } = request.params;

    return await Note.destroy({ where: { id } });
  }

  return {
    method: 'DELETE',
    path: '/note/{id}',
    config: {
      handler,
      description: 'Delete exists release note',
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.number()
        })
      }
    }
  }
}
