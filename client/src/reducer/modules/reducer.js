import { combineReducers } from 'redux';
import user from './user.js';

const reducerModules = {
  user
};

export default combineReducers(reducerModules);
