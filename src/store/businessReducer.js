import * as actions from '../store/actions';
import * as businessServices from '../services/business';

const businessState = {
  currentBusiness: null,
};

export const createBusiness = (payload) => async (dispatch) => {
    try {
        const [currentBusiness] = await businessServices.createBusiness(payload);
    dispatch({
      type: actions.CREATE_BUSINESS,
      payload: { currentBusiness },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateBusiness = (payload) => async (dispatch) => {
  try {
    const [currentBusiness] = await businessServices.updateBusiness(payload);
    dispatch({
      type: actions.UPDATE_BUSINESS,
      payload: { currentBusiness },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBusinessAll =
  () => async (dispatch) => {
    try {
      const [currentBusiness] = await businessServices.getBusinessAll();
      dispatch({
        type: actions.GET_BUSINESS_ALL,
        payload: { currentBusiness },
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const getBusinessByUser =
  (id) => async (dispatch) => {
    try {
      const [currentBusiness] = await businessServices.getBusinessByUser(id);
      dispatch({
        type: actions.GET_BUSINESS_BY_USER,
        payload: { currentBusiness },
      });
    } catch (error) {
      console.log(error);
    }
  };

const handlers = {
  [actions.CREATE_BUSINESS]: (state, { currentBusiness }) => ({
    ...state,
    currentBusiness,
  }),
  [actions.GET_BUSINESS_ALL]: (state, { currentBusiness }) => ({
    ...state,
    currentBusiness,
  }),
  [actions.GET_BUSINESS_BY_USER]: (state, { currentBusiness }) => ({
    ...state,
    currentBusiness,
  }),
  [actions.UPDATE_BUSINESS]: (state, { currentBusiness }) => ({
    ...state,
    currentBusiness: state.currentBusiness.map((business) => {
      if (business._id === currentBusiness._id) {
        return Object.assign(business, currentBusiness);
      }
      return business;
    }),
  }),
};

export const businessReducer = (state = businessState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
