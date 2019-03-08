import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
//
import globalReducer from './pages/App/reducer';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers, { history }) {
  return combineReducers({
    global: globalReducer,
    router: connectRouter(history),
    form: formReducer,
    ...injectedReducers,
  });
}
