import lodash from 'lodash';
import uuid from 'uuid';
//
import {
  LOAD_APPLICATIONS_LIST,
  LOAD_APPLICATIONS_SUCCESS,
  LOAD_APPLICATIONS_ERROR,
  CREATE_APPLICATION,
  CREATE_APPLICATION_SUCCESS,
  CREATE_APPLICATION_ERROR,
  LOAD_APPLICATIONS_UPDATE_FILTERS
} from './constants';
import * as applicationsRequests from 'utils/api/applications'

/**
 *
 * @param filter
 * @returns {Function}
 */
export function loadApplications(filter) {
  return async (dispatch, getState) => {
    const { adminPanel } = getState();
    const storeFilter = lodash.get(adminPanel, 'applications.filter', {});

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
 * @param data
 * @returns {Function}
 */
export function createApplication(data) {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      dispatch({
        type: CREATE_APPLICATION
      });

      try {
        const response = await applicationsRequests.createApplication(data);
        resolve();
        return dispatch({
          type: CREATE_APPLICATION_SUCCESS,
          payload: {...response}
        });
      } catch (error) {
        resolve();
        return dispatch({
          type: CREATE_APPLICATION_ERROR,
          payload: {
            error: {
              id: uuid.v4(),
              ...lodash.get(error, 'data', {})
            }
          }
        });
      }
    });
  };
}

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