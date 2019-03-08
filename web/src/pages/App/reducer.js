import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR } from './constants';

// The initial state of the App
const initialState = {
  loading: false,
  error: false
};

function appReducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {

    default:
      return state;
  }
}

export default appReducer;
