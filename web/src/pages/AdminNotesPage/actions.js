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
  CLEAR_NOTES_LIST,
  CREATE_NOTE,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_ERROR,
  EDIT_NOTE,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_ERROR,
  DELETE_NOTE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR
} from './constants';
import * as notesRequests from 'utils/api/notes'
import * as applicationsRequests from 'utils/api/applications';

/**
 *
 * @param filter
 * @returns {Function}
 */
export function loadNotes(filter) {
  return async (dispatch) => {
    dispatch({
      type: LOAD_NOTES_LIST
    });

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
        resolve(response);
        return dispatch({
          type: CREATE_NOTE_SUCCESS,
          payload: {...response}
        });
      } catch (error) {
        resolve({ error });
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
 * @param id
 * @param data
 * @returns {function(*): Promise<any>}
 */
export function editNote(id, data) {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      dispatch({
        type: EDIT_NOTE
      });

      try {
        const response = await notesRequests.editNote(id, data);
        resolve(response);
        return dispatch({
          type: EDIT_NOTE_SUCCESS,
          payload: {...response}
        });
      } catch (error) {
        resolve({ error });
        return dispatch({
          type: EDIT_NOTE_ERROR,
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
export function deleteNote(id) {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      dispatch({
        type: DELETE_NOTE
      });

      try {
        const response = await notesRequests.deleteNote(id);
        resolve(response);
        return dispatch({
          type: DELETE_NOTE_SUCCESS,
          payload: {...response}
        });
      } catch (error) {
        resolve({ error });
        return dispatch({
          type: DELETE_NOTE_ERROR,
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