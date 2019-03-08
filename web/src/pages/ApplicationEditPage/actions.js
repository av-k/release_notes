import lodash from 'lodash';
import uuid from 'uuid';
//
import {
  LOAD_NOTES_LIST,
  LOAD_NOTES_LIST_SUCCESS,
  LOAD_NOTES_LIST_ERROR,
  CREATE_NOTE,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_ERROR,
  LOAD_NOTES_UPDATE_FILTERS
} from './constants';
import * as notesRequests from 'utils/api/notes'

/**
 *
 * @param applicationId
 * @returns {Function}
 */
export function loadNotes(applicationId) {
  return async (dispatch) => {
    dispatch({
      type: LOAD_NOTES_LIST
    });

    try {
      const response = await notesRequests.loadNotes({ applicationId });
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
 * @param data
 * @returns {Function}
 */
export function createNote(data) {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      dispatch({
        type: CREATE_NOTE
      });

      try {
        const response = await notesRequests.createNote(data);
        resolve();
        return dispatch({
          type: CREATE_NOTE_SUCCESS,
          payload: {...response}
        });
      } catch (error) {
        resolve();
        return dispatch({
          type: CREATE_NOTE_ERROR,
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
 * @param filter
 * @returns {Function}
 */
export function updateFilter(filter) {
  return async (dispatch) => {
    dispatch({
      type: LOAD_NOTES_UPDATE_FILTERS,
      payload: {
        filter
      }
    });
  }
}

