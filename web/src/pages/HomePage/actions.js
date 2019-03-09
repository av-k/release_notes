import lodash from 'lodash';
import uuid from 'uuid';
//
import {
  LOAD_APPLICATIONS_LIST,
  LOAD_APPLICATIONS_SUCCESS,
  LOAD_APPLICATIONS_ERROR,
  LOAD_APPLICATIONS_UPDATE_FILTERS
} from './constants';
import * as applicationsRequests from 'utils/api/applications'

/**
 *
 * @param options
 * @returns {Function}
 */
export function loadApplications(filter) {
  return async (dispatch, getState) => {
    const { home } = getState();
    const storeFilter = lodash.get(home, 'applications.filter', {});

    dispatch({
      type: LOAD_APPLICATIONS_LIST
    });

    try {
      const response = await applicationsRequests.loadApplications(filter || storeFilter);
      return dispatch({
        type: LOAD_APPLICATIONS_SUCCESS,
        payload: { filter: filter || storeFilter, ...response }
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

/**
 *
 * @param filter
 * @returns {Function}
 */
export function updateFilter(filter) {
  return async (dispatch) => {
    dispatch({
      type: LOAD_APPLICATIONS_UPDATE_FILTERS,
      payload: {
        filter
      }
    });
  }
}