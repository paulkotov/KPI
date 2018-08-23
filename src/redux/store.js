import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const middlwares = [logger, thunk];

export default function () {
  return createStore(rootReducer, applyMiddleware(...middlwares));
}