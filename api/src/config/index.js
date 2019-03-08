'use strict';
import env from './env';

const constants = {
  isPROD: env.NODE_ENV === 'production',
  ...env
};

export default constants;
