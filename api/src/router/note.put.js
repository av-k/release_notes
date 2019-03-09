'use strict';
import Joi from 'joi';
import _ from 'lodash';
import Boom from 'boom';
import moment from 'moment';
// FIXME - next step > to check headers.Authorization
export default function noteCreate(props = {}) {
  const { server } = props;

  /**
   *
   * @param props
   * @returns {Promise<*>}
   */
  async function errorHandler(props) {
    return new Promise(async (resolve) => {
      const { request } = props;
      const models = _.get(server, 'app.dao._sequelize.models', {});
      const Application = models.application;
      const applicationIsExists = await Application.count({ where: { id: request.payload.applicationId } }) > 0;
      let error;
      let errorOptions = { statusCode: 400 };

      if (!applicationIsExists) {
        error = new Error('Incorrect value for field `applicationId`. Application not exists.');
      }

      if (request.payload.releaseDate) {
        const releaseDateMoment = moment(request.payload.releaseDate);

        if (!releaseDateMoment.isValid()) {
          error = new Error('Incorrect format for field `releaseDate`. Expected valid date.');
        }
      }

      if (!error) {
        resolve();
      } else {
        resolve(Boom.boomify(error, errorOptions));
      }
    });
  }

  async function handler(request, h) {
    const models = _.get(server, 'app.dao._sequelize.models', {});
    const Note = models.note;
    const helpers = request.server.app.helpers;
    const fields = [
      'applicationId', 'userId', 'version', 'description', 'published',
      'releaseDate', 'createdAt', 'updatedAt'
    ];
    const anyErrors = await errorHandler({ request });

    if (anyErrors) {
      return anyErrors;
    }

    request.payload.userId = 1; // must be obtained from accessToken
    request.payload.createdAt = new Date();
    request.payload.updatedAt = new Date();

    return await Note.create(helpers.routerPayloadHandler({ request, fields }));
  }

  return {
    method: 'PUT',
    path: '/note/create',
    config: {
      handler,
      description: 'Create new release note',
      notes: 'Create new release note instance',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      },
      validate: {
        payload: Joi.object({
          applicationId: Joi.number()
            .required(),
          description: Joi.string()
            .optional(),
          published: Joi.boolean()
            .default(false)
            .optional(),
          version: Joi.string()
            .description('Expected format `xxx.yyy.zzz`. Where `x/y/s` are numbers.')
            .required()
            .regex(/^(\d+\.)(\d+\.)(\*|\d+)$/),
          releaseDate: Joi.string()
            .description('Expected format `YYYY-MM-DD`')
            .required()
            .regex(/^(\d+-)(\d+-)(\*|\d+)$/)
        })
      }
    }
  }
}
