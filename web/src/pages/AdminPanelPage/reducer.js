import {
  LOAD_APPLICATIONS_LIST,
  LOAD_APPLICATIONS_SUCCESS,
  LOAD_APPLICATIONS_ERROR,
  CREATE_APPLICATION,
  CREATE_APPLICATION_SUCCESS,
  CREATE_APPLICATION_ERROR,
  LOAD_APPLICATIONS_UPDATE_FILTERS
} from './constants';
import { updateState } from 'utils/reducer';

const initialState = {
  error: null,
  createApplication: {
    loading: false
  },
  applications: {
    filter: {},
    loading: false,
    meta: {},
    results: []
  }
};

function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_APPLICATIONS_LIST:
      return updateState(state, {
        error: null,
        applications: {
          loading: true,
          ...payload
        }
      });

    case LOAD_APPLICATIONS_SUCCESS:
      return updateState(state, {
        error: null,
        applications: {
          loading: false,
          ...payload
        }
      });

    case LOAD_APPLICATIONS_ERROR:
      return updateState(state, {
        applications: {
          loading: false,
          meta: {},
          results: [],
          ...payload
        }
      });

    case CREATE_APPLICATION:
      return updateState(state, {
        error: null,
        createApplication: {
          loading: true
        }
      });

    case CREATE_APPLICATION_SUCCESS:
      return updateState(state, {
        error: null,
        createApplication: {
          loading: false
        }
      });

    case CREATE_APPLICATION_ERROR:
      return updateState(state, {
        createApplication: {
          loading: false,
        },
        ...payload
      });

    case LOAD_APPLICATIONS_UPDATE_FILTERS:
      return updateState(state, {
        applications: {
          ...payload
        }
      });

    default:
      return state;
  }
}

export default reducer;
