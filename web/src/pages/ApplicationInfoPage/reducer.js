import {
  LOAD_APPLICATION,
  LOAD_APPLICATION_SUCCESS,
  LOAD_APPLICATION_ERROR
} from './constants';
import { updateState } from 'utils/reducer';

const initialState = {
  loading: false,
  error: null,
  data: {}
};

function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_APPLICATION:
      return updateState(state, {
        loading: true,
        error: null
      });

    case LOAD_APPLICATION_SUCCESS:
      return updateState(state, {
        loading: false,
        error: null,
        ...payload
      });

    case LOAD_APPLICATION_ERROR:
      return updateState(state, {
        loading: false,
        data: {},
        ...payload
      });

    default:
      return state;
  }
}

export default reducer;
