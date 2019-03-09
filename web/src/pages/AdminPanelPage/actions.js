import lodash from 'lodash';
import uuid from 'uuid';
//
import {
  LOAD_APPLICATIONS_LIST,
  LOAD_APPLICATIONS_SUCCESS,
  LOAD_APPLICATIONS_ERROR,
  LOAD_APPLICATIONS_UPDATE_FILTERS,
  CREATE_APPLICATION,
  CREATE_APPLICATION_SUCCESS,
  CREATE_APPLICATION_ERROR,
  EDIT_APPLICATION,
  EDIT_APPLICATION_SUCCESS,
  EDIT_APPLICATION_ERROR,
  DELETE_APPLICATION,
  DELETE_APPLICATION_SUCCESS,
  DELETE_APPLICATION_ERROR
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
        resolve(response);
        return dispatch({
          type: CREATE_APPLICATION_SUCCESS,
          payload: {...response}
        });
      } catch (error) {
        resolve({ error });
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

/**
 *
 * @param id
 * @param data
 * @returns {function(*): Promise<any>}
 */
export function editApplication(id, data) {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      dispatch({
        type: EDIT_APPLICATION
      });

      try {
        const response = await applicationsRequests.editApplication(id, data);
        resolve(response);
        return dispatch({
          type: EDIT_APPLICATION_SUCCESS,
          payload: {...response}
        });
      } catch (error) {
        resolve({ error });
        return dispatch({
          type: EDIT_APPLICATION_ERROR,
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

/**
 *
 * @param id
 * @returns {Function}
 */
export function deleteApplication(id) {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      dispatch({
        type: DELETE_APPLICATION
      });

      try {
        const response = await applicationsRequests.deleteApplication(id);
        resolve(response);
        return dispatch({
          type: DELETE_APPLICATION_SUCCESS,
          payload: {...response}
        });
      } catch (error) {
        resolve({ error });
        return dispatch({
          type: DELETE_APPLICATION_ERROR,
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