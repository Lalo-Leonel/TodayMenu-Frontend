import * as actions from './actions';
import * as authServices from '../services/auth';

const authState = {
  currentUser: null,
  token: null,
};

export const authLogin = (payload) => async (dispatch) => {
  const [token] = await authServices.authLogin(payload);
  dispatch({
    type: actions.AUTH_LOGIN,
    payload: { token },
  });
};

export const authRegister = (payload) => async (dispatch) => {
  const [token] = await authServices.authRegister(payload);
  dispatch({
    type: actions.AUTH_REGISTER,
    payload: { token },
  });
};

export const authLogout = () => async (dispatch) => {
  localStorage.removeItem('token');
  dispatch({
    type: actions.AUTH_LOGOUT,
  });
};

export const getCurrentUser = (token) => async (dispatch) => {
  const [currentUser] = await authServices.getCurrentUser(token);
  dispatch({
    type: actions.GET_CURRENT_USER,
    payload: { currentUser },
  });
};

const handlers = {
  [actions.AUTH_LOGIN]: (state, { token }) => ({
    ...state,
    token,
  }),
  [actions.AUTH_REGISTER]: (state, { token }) => ({
    ...state,
    token,
  }),
  [actions.AUTH_LOGOUT]: (state) => ({
    ...state,
    token: null,
  }),
  [actions.GET_CURRENT_USER]: (state, { currentUser }) => ({
    ...state,
    currentUser,
  }),
};

export const authReducer = (state = authState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
