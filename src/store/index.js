import { createStore, combineReducers, applyMiddleware } from 'redux';
import { authReducer } from './authReducer';

import thunk from 'redux-thunk';
import { menuReducer } from './menuReducer';

const middleware = applyMiddleware(thunk);

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
});

export const store = createStore(rootReducer, middleware);
