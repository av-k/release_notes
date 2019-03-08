'use strict';
import Joi from 'joi';
import _ from 'lodash';
import Boom from 'boom';

export default function home(props = {}) {
  const { server } = props;

  /**
   *
   * @param props
   * @returns {Promise<*>}
   */
  async function errorHandler(props) {
    return new Promise(async (resolve) => {
      const { user } = props;
      let error;
      let errorOptions = { statusCode: 400 };

      if (!user) {
        error = new Error('incorrect email or password.');
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
    const User = models.user;
    const { email, password } = request.payload;
    const user = await User.findOne({ // Here must be user verification and password check
      where: {
        email, password // <- some lol
      }
    });
    const anyErrors = await errorHandler({ request, user });

    if (anyErrors) {
      return anyErrors;
    }

    return {
      data: user,
      accessToken: 'ohohoho' // <- next some lol
    }
  }

  return {
    method: 'POST',
    path: '/user/auth',
    config: {
      handler,
      description: 'User authentication',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      },
      validate: {
        payload: Joi.object({
          email: Joi.string()
            .required()
            .regex(/@\w+([\.-_]?\w+)*(\.\w{2,7})+$/),
          password: Joi.string()
            .required()
        })
      }
    }
  }
}
