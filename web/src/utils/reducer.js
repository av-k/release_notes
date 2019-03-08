export const updateState = function(state = {}, newState = {}) {
  return {
    ...state, ...newState
  };
};
