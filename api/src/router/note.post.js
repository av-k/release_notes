'use strict';
import Joi from 'joi';
import _ from 'lodash';
import Boom from 'boom';
import moment from 'moment';
// FIXME - next step > to check headers.Authorization
export default function noteUpdate(props = {}) {
  const { server } = props;

  /**
   *
   * @param props
   * @returns {Promise<*>}
   */
  async function errorHandler(props) {
    return new Promise(async (resolve) => {
      const { request } = props;
      let error;
      let errorOptions = { statusCode: 400 };

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

  /**
   *
   * @param request
   * @param h
   * @returns {Promise<*>}
   */
  async function handler(request, h) {
    const models = _.get(server, 'app.dao._sequelize.models', {});
    const Note = models.note;
    const { id } = request.params;
    const helpers = request.server.app.helpers;
    const fields = [
      'version', 'description', 'published', 'releaseDate', 'updatedAt'
    ];
    const note = await Note.findOne({ where: { id } });
    const anyErrors = await errorHandler({ request });

    if (anyErrors) {
      return anyErrors;
    }

    request.payload.updatedAt = new Date();

    return await note.update(
      helpers.routerPayloadHandler({ request, fields }),
      { fields }
    );
  }

  return {
    method: 'POST',
    path: '/note/{id}',
    config: {
      handler,
      description: 'Update exists release note',
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
          description: Joi.string()
            .optional(),
          published: Joi.boolean()
            .default(false)
            .optional(),
          version: Joi.string()
            .description('Expected format `xxx.yyy.zzz`. Where `x/y/s` are numbers.')
            .optional()
            .regex(/^(\d+\.)(\d+\.)(\*|\d+)$/),
          releaseDate: Joi.string()
            .description('Expected format `YYYY-MM-DD`.')
            .optional()
            .regex(/^(\d+-)(\d+-)(\*|\d+)$/)
        })
      }
    }
  }
}
