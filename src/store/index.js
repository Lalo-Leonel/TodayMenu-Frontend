import { createStore, combineReducers, applyMiddleware } from 'redux';
import { authReducer } from './authReducer';

import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(rootReducer, middleware);
