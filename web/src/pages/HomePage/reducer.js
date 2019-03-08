import {  } from './constants';

// The initial state of the App
const initialState = {
  loading: false
};

function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {

    default:
      return state;
  }
}

export default reducer;
