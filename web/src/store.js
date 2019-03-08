import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';
//
import createReducer from './reducers'
import { loadStore } from './utils/localStorage';

const initialState = loadStore();
const injectedReducers = {};
const enhancers = [];
export const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV !== 'production') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  createReducer(initialState, { history }),
  composedEnhancers
);

store.injectedReducers = injectedReducers;

// Make reducers hot reloadable, see http://mxs.is/googmo
/* istanbul ignore next */
if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(createReducer(store.injectedReducers, { history }));
  });
}

export default store;
