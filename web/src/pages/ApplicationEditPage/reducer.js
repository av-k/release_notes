import {
  LOAD_NOTES_LIST,
  LOAD_NOTES_LIST_SUCCESS,
  LOAD_NOTES_LIST_ERROR,
  LOAD_NOTES_UPDATE_FILTERS
} from './constants';
import { updateState } from 'utils/reducer';
import {LOAD_APPLICATIONS_UPDATE_FILTERS} from "../AdminPanelPage/constants";

const initialState = {
  error: null,
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

    case LOAD_APPLICATIONS_UPDATE_FILTERS:
      return updateState(state, {
        notes: {
          ...payload
        }
      });

    default:
      return state;
  }
}

export default reducer;
