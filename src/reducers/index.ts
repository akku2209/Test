import { combineReducers } from 'redux';
import authReducer from './authReducer';
import bookReducer from './bookReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  book : bookReducer,
  user : userReducer
});

export default rootReducer;
