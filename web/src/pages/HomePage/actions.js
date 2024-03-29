import lodash from 'lodash';
import uuid from 'uuid';
//
import {
  LOAD_APPLICATIONS_LIST,
  LOAD_APPLICATIONS_SUCCESS,
  LOAD_APPLICATIONS_ERROR
} from './constants';
import * as applicationsRequests from 'utils/api/applications'

/**
 *
 * @param filter
 * @returns {Function}
 */
export function loadApplications(filter) {
  return async (dispatch) => {
    dispatch({
      type: LOAD_APPLICATIONS_LIST
    });

    try {
      const response = await applicationsRequests.loadApplications(filter);
      return dispatch({
        type: LOAD_APPLICATIONS_SUCCESS,
        payload: response
      });
    } catch(error) {
      return dispatch({
        type: LOAD_APPLICATIONS_ERROR,
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
