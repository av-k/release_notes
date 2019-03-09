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
import { updateState } from 'utils/reducer';

const initialState = {
  error: null,
  createNote: {
    loading: false
  },
  editNote: {
    loading: false
  },
  deleteNote: {
    loading: false
  },
  notes: {
    filter: {},
    loading: false,
    meta: {},
    results: []
  },
  application: {
    loading: false,
    data: {}
  }
};

function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_NOTES_LIST:
      return updateState(state, {
        error: null,
        notes: {
          loading: true,
          ...payload
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
          loading: false,
          meta: {},
          results: [],
          ...payload
        }
      });

    case CLEAR_NOTES_LIST:
      return updateState(state, {
        notes: {
          loading: false,
          meta: {},
          results: [],
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
          loading: false
        },
        ...payload
      });

    case EDIT_NOTE:
      return updateState(state, {
        error: null,
        editNote: {
          loading: true
        }
      });

    case EDIT_NOTE_SUCCESS:
      return updateState(state, {
        error: null,
        editNote: {
          loading: false
        }
      });

    case EDIT_NOTE_ERROR:
      return updateState(state, {
        editNote: {
          loading: false
        },
        ...payload
      });

    case DELETE_NOTE:
      return updateState(state, {
        error: null,
        deleteNote: {
          loading: true
        }
      });

    case DELETE_NOTE_SUCCESS:
      return updateState(state, {
        error: null,
        deleteNote: {
          loading: false
        }
      });

    case DELETE_NOTE_ERROR:
      return updateState(state, {
        deleteNote: {
          loading: false
        },
        ...payload
      });

    case LOAD_APPLICATION:
      return updateState(state, {
        application: {
          loading: true
        }
      });

    case LOAD_APPLICATION_SUCCESS:
      return updateState(state, {
        application: {
          loading: false,
          data: payload
        }
      });

    case LOAD_APPLICATION_ERROR:
      return updateState(state, {
        application: {
          loading: false
        },
        ...payload
      });

    default:
      return state;
  }
}

export default reducer;
