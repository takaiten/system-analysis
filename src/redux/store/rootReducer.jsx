import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { authReducer } from '../ducks/reducers';

export default history =>
  combineReducers({
    router: connectRouter(history),
    // TODO: Put reducers here
    auth: authReducer
  });
