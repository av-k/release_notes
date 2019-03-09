import lodash from 'lodash';
import uuid from 'uuid';
//
import {
  LOAD_NOTES_LIST,
  LOAD_NOTES_LIST_SUCCESS,
  LOAD_NOTES_LIST_ERROR,
  LOAD_APPLICATION,
  LOAD_APPLICATION_SUCCESS,
  LOAD_APPLICATION_ERROR,
  CLEAR_NOTES_LIST
} from './constants';
import * as notesRequests from 'utils/api/notes'
import * as applicationsRequests from 'utils/api/applications';

/**
 *
 * @param filter
 * @returns {Function}
 */
export function loadNotes(filter = {}) {
  return async (dispatch) => {
    dispatch({
      type: LOAD_NOTES_LIST
    });

    // public only (some type of hardcode - but can be implemented as different end point)
    filter.published = true;

    try {
      const response = await notesRequests.loadNotes(filter);
      return dispatch({
        type: LOAD_NOTES_LIST_SUCCESS,
        payload: response
      });
    } catch(error) {
      return dispatch({
        type: LOAD_NOTES_LIST_ERROR,
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
 * @returns {Function}
 */
export function clearNotes() {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_NOTES_LIST
    });
  }
}

/**
 *
 * @param id
 * @param options
 * @returns {Function}
 */
export function loadApplication(id, options) {
  return async (dispatch) => {
    dispatch({
      type: LOAD_APPLICATION
    });

    try {
      const response = await applicationsRequests.loadApplication(id, options);
      return dispatch({
        type: LOAD_APPLICATION_SUCCESS,
        payload: response
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