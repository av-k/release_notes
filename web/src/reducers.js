import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers, { history }) {
  return combineReducers({
    router: connectRouter(history),
    form: formReducer,
    ...injectedReducers,
  });
}
