import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import defaultState from './default';

export default (history) => combineReducers({
  app: defaultState,
  router: connectRouter(history),
});