import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory as createHistory } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import createRootReducer from './rootReducer';

// our load state function
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// save our state to localstorage
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // ignore write errors
  }
};

// Browser history
export const history = createHistory();
// Save state to local storage
const persistedState = loadState();
// Router middleware
const routerMiddleware = createRouterMiddleware(history);

// set up our store with the redux chrome extension
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  createRootReducer(history),
  persistedState,
  composeEnhancer(applyMiddleware(routerMiddleware))
);
