import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import auth from './auth';
import menu from './menu';
import users from './users';
import structure from './structure';
import employees from './employees';
import indexes from './indexes';
import plan from './plan';
import fact from './fact';

const rootReducer = combineReducers({
  router,
  auth,
  menu,
  users,
  structure,
  employees,
  indexes,
  plan,
  fact
});

export default rootReducer;