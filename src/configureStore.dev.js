import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import DevTools from './DevTools';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

export default function configureStore(rootReducer, initialState, history) {
  const middleware = routerMiddleware(history);

  const store = createStore(
    combineReducers({
      ...rootReducer,
      router: routerReducer
    }),
    initialState || undefined,
    compose(
      applyMiddleware(middleware, thunk, createLogger({
        collapsed: true
      })),
      DevTools.instrument(),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&#]+)\b/
        )
      )
    )
  );

  return store;
}