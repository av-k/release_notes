import {
  LOAD_APPLICATIONS_LIST,
  LOAD_APPLICATIONS_SUCCESS,
  LOAD_APPLICATIONS_ERROR,
  LOAD_APPLICATIONS_UPDATE_FILTERS
} from './constants';
import { updateState } from 'utils/reducer';

const initialState = {
  applications: {
    filter: {},
    loading: false,
    error: null,
    meta: {},
    results: []
  }
};

function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_APPLICATIONS_LIST:
      return updateState(state, {
        applications: {
          loading: true,
          error: null
        }
      });

    case LOAD_APPLICATIONS_SUCCESS:
      return updateState(state, {
        applications: {
          loading: false,
          error: null,
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

    default:
      return state;
  }
}

export default reducer;
