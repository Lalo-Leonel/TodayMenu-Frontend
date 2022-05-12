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

const handlers = {
  [actions.AUTH_LOGIN]: (state, { token }) => ({
    ...state,
    token,
  }),
};

export const authReducer = (state = authState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
