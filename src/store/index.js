import { createStore, combineReducers, applyMiddleware } from 'redux';
import { authReducer } from './authReducer';

import thunk from 'redux-thunk';
import { menuReducer } from './menuReducer';
import { businessReducer } from './businessReducer';
import { requestReducer } from './requestReducer';

const middleware = applyMiddleware(thunk);

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  business: businessReducer,
  request: requestReducer
});

export const store = createStore(rootReducer, middleware);
