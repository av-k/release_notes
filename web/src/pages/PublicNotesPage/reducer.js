import {
  LOAD_NOTES_LIST,
  LOAD_NOTES_LIST_SUCCESS,
  LOAD_NOTES_LIST_ERROR,
  LOAD_APPLICATION,
  LOAD_APPLICATION_SUCCESS,
  LOAD_APPLICATION_ERROR,
  CLEAR_NOTES_LIST
} from './constants';
import { updateState } from 'utils/reducer';

const initialState = {
  error: null,
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
