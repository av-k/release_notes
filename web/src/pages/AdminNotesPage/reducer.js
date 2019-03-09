import {
  LOAD_NOTES_LIST,
  LOAD_NOTES_LIST_SUCCESS,
  LOAD_NOTES_LIST_ERROR,
  LOAD_NOTES_UPDATE_FILTERS,
  CREATE_NOTE,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_ERROR
} from './constants';
import { updateState } from 'utils/reducer';

const initialState = {
  error: null,
  createNote: {
    loading: false
  },
  notes: {
    loading: false,
    filter: {}
  }
};

function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_NOTES_LIST:
      return updateState(state, {
        error: null,
        notes: {
          loading: true
        }
      });

    case LOAD_NOTES_LIST_SUCCESS:
      return updateState(state, {
        error: null,
        notes: {
          loading: false,
          ...payload
        }
      });

    case LOAD_NOTES_LIST_ERROR:
      return updateState(state, {
        notes: {
          loading: false
        },
        ...payload
      });

    case LOAD_NOTES_UPDATE_FILTERS:
      return updateState(state, {
        notes: {
          ...payload
        }
      });

    case CREATE_NOTE:
      return updateState(state, {
        error: null,
        createNote: {
          loading: true
        }
      });

    case CREATE_NOTE_SUCCESS:
      return updateState(state, {
        error: null,
        createNote: {
          loading: false
        }
      });

    case CREATE_NOTE_ERROR:
      return updateState(state, {
        createNote: {
          loading: false,
        },
        ...payload
      });

    default:
      return state;
  }
}

export default reducer;
