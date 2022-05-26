import * as actions from '../store/actions';
import * as requestServices from '../services/request';

const requestState = {
  currentRequest: null,
};

export const createRequest = (payload) => async (dispatch) => {
    try {
        const [currentRequest] = await requestServices.createRequest(payload);
    dispatch({
      type: actions.CREATE_REQUEST,
      payload: { currentRequest },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateRequest = (payload) => async (dispatch) => {
  try {
    const [currentRequest] = await requestServices.updateRequest(payload);
    dispatch({
      type: actions.UPDATE_REQUEST,
      payload: { currentRequest },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRequestAll =
  () => async (dispatch) => {
    try {
      const [currentRequest] = await requestServices.getRequestAll();
      dispatch({
        type: actions.GET_REQUEST_ALL,
        payload: { currentRequest },
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const getRequestByUser =
  (id) => async (dispatch) => {
    try {
      const [currentRequest] = await requestServices.getRequestByUser(id);
      dispatch({
        type: actions.GET_REQUEST_BY_USER,
        payload: { currentRequest },
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const getRequestByBusiness =
  (id) => async (dispatch) => {
    try {
      const [currentRequest] = await requestServices.getRequestByBusiness(id);
      dispatch({
        type: actions.GET_REQUEST_BY_BUSINESS,
        payload: { currentRequest },
      });
    } catch (error) {
      console.log(error);
    }
  };

const handlers = {
  [actions.CREATE_REQUEST]: (state, { currentRequest }) => ({
    ...state,
    currentRequest,
  }),
  [actions.GET_REQUEST_ALL]: (state, { currentRequest }) => ({
    ...state,
    currentRequest,
  }),
  [actions.GET_REQUEST_BY_USER]: (state, { currentRequest }) => ({
    ...state,
    currentRequest,
  }),
  [actions.GET_REQUEST_BY_BUSINESS]: (state, { currentRequest }) => ({
    ...state,
    currentRequest,
  }),
  [actions.UPDATE_REQUEST]: (state, { currentRequest }) => ({
    ...state,
    currentRequest: state.currentRequest.map((request) => {
      if (request._id === currentRequest._id) {
        return Object.assign(request, currentRequest);
      }
      return request;
    }),
  }),
};

export const requestReducer = (state = requestState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
