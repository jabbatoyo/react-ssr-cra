import {createBrowserHistory as createClientHistory, createMemoryHistory as createServerHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import Raven from 'raven-js';
import createRavenMiddleware from 'raven-for-redux';

import isSSR from './../config/isSSR';
import rootReducer from './reducers';

const enhancers = [];
if (process.env.NODE_ENV === 'development' && !isSSR()) {
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }
}

export default ({path, preloadedState = {}}) => {
  const history = isSSR() ? createServerHistory({initialEntries: [path]}) : createClientHistory();
  const middlewares = [thunk, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'production') {
    middlewares.push(createRavenMiddleware(Raven));
  } else {
    middlewares.push(reduxImmutableStateInvariant());
  }

  return {
    history: history,
    store: createStore(rootReducer(history), preloadedState, compose(applyMiddleware(...middlewares), ...enhancers)),
  };
};
