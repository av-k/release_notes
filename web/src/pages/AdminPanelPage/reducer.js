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
import { updateState } from 'utils/reducer';

const initialState = {
  error: null,
  createApplication: {
    loading: false
  },
  editApplication: {
    loading: false
  },
  deleteApplication: {
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

    case LOAD_APPLICATIONS_UPDATE_FILTERS:
      return updateState(state, {
        applications: {
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

    case EDIT_APPLICATION:
      return updateState(state, {
        error: null,
        editApplication: {
          loading: true
        }
      });

    case EDIT_APPLICATION_SUCCESS:
      return updateState(state, {
        error: null,
        editApplication: {
          loading: false
        }
      });

    case EDIT_APPLICATION_ERROR:
      return updateState(state, {
        editApplication: {
          loading: false,
        },
        ...payload
      });

    case DELETE_APPLICATION:
      return updateState(state, {
        error: null,
        deleteApplication: {
          loading: true
        }
      });

    case DELETE_APPLICATION_SUCCESS:
      return updateState(state, {
        error: null,
        deleteApplication: {
          loading: false
        }
      });

    case DELETE_APPLICATION_ERROR:
      return updateState(state, {
        deleteApplication: {
          loading: false,
        },
        ...payload
      });

    default:
      return state;
  }
}

export default reducer;
