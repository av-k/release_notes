'use strict';
import _ from 'lodash';
import Joi from 'joi';

export default function home(props = {}) {
  const { server } = props;

  async function handler(request, h) {
    const models = _.get(server, 'app.dao._sequelize.models', {});
    const Application = models.application;
    const { pagination, limit, page } = request.query;
    const filterFields = ['name', 'userId'];
    const where = Object.keys(request.query).reduce((accumulator, field) => {
      if (!!~filterFields.indexOf(field)) {
        accumulator[field] = request.query[field];
      }
      return accumulator;
    }, {});

    const results = await Application.findAll({
      where,
      ...(() => !pagination ? {} : {
        offset: page * limit,
        limit: limit
      })()
    });
    return {
      results,
      totalCount: results.length
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
