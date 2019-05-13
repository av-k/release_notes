'use strict';
import _ from 'lodash';
import Joi from 'joi';

export default function applicationsList(props = {}) {
  const { server } = props;

  async function handler(request, h) {
    const models = _.get(server, 'app.dao._sequelize.models', {});
    const Application = models.application;
    const { pagination, limit, page } = request.query;
    const where = Application.composeWhere(request, { query: true });
    const paginationOptions = !pagination ? {} : {
      offset: page * limit,
      limit: limit
    };
    const results = await Application.findAndCountAll({
      where, ...paginationOptions
    });
    return {
      results: results.rows,
      totalCount: results.count
    };
  }

  return {
    method: 'GET',
    path: '/application/list',
    config: {
      handler,
      description: 'Get list of applications',
      notes: 'List of exists applications',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      },
      validate: {
        query: {
          name: Joi.string(),
          userId: Joi.number(),
          limit: Joi.number().integer(),
          page: Joi.number().integer(),
          pagination: Joi.boolean()
        }
      }
    }
  }
}
