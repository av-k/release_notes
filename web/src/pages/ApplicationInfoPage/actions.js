import lodash from 'lodash';
import uuid from 'uuid';
//
import {
  LOAD_APPLICATION,
  LOAD_APPLICATION_SUCCESS,
  LOAD_APPLICATION_ERROR
} from './constants';
import * as applicationsRequests from 'utils/api/applications'

export function loadApplication(id, options) {
  return async (dispatch) => {
    dispatch({
      type: LOAD_APPLICATION
    });

    try {
      const response = await applicationsRequests.loadApplication(id, options);
      return dispatch({
        type: LOAD_APPLICATION_SUCCESS,
        payload: {
          data: response
        }
      });
    } catch(error) {
      return dispatch({
        type: LOAD_APPLICATION_ERROR,
        payload: {
          error: {
            id: uuid.v4(),
            ...lodash.get(error, 'data', {})
          }
        }
      });
    }
  };
}
