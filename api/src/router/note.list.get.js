'use strict';
import _ from 'lodash';
import Joi from 'joi';
import sequelize from 'sequelize';

export default function notesList(props = {}) {
  const { server } = props;

  async function handler(request, h) {
    const models = _.get(server, 'app.dao._sequelize.models', {});
    const Note = models.note;
    const { pagination, limit, page, version } = request.query;
    const filterFields = ['applicationId', 'userId', 'published'];
    const where = Object.keys(request.query).reduce((accumulator, field) => {
      if (!!~filterFields.indexOf(field)) {
        accumulator[field] = request.query[field];
      }
      return accumulator;
    }, {});

    const results = await Note.findAndCountAll({
      where: sequelize.and(
        where,
        version ? sequelize.where(sequelize.literal('version'), '>', version) : {}
      ),
      ...(() => !pagination ? {} : {
        offset: page * limit,
        limit: limit
      })()
    });
    return {
      results: results.rows,
      totalCount: results.count
    };
  }

  return {
    method: 'GET',
    path: '/note/list',
    config: {
      handler,
      description: 'Get list of release notes',
      notes: 'List of exists release notes',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      },
      validate: {
        query: {
          applicationId: Joi.number(),
          userId: Joi.number(),
          published: Joi.boolean(),
          version: Joi.string()
            .description('Expected format `xxx.yyy.zzz`. Where `x/y/s` are numbers.')
            .regex(/^(\d+\.)(\d+\.)(\*|\d+)$/),
          limit: Joi.number().integer(),
          page: Joi.number().integer(),
          pagination: Joi.boolean()
        }
      }
    }
  }
}
