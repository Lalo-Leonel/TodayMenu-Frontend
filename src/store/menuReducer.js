import * as actions from '../store/actions';
import * as menuServices from '../services/menu';

const menuState = {
  currentMenu: null,
};

export const createMenu = (payload) => async (dispatch) => {
    try {
        const [currentMenu] = await menuServices.createMenu(payload);
    dispatch({
      type: actions.CREATE_MENU,
      payload: { currentMenu },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateMenu = (payload) => async (dispatch) => {
  try {
    const [currentMenu] = await menuServices.updateMenu(payload);
    dispatch({
      type: actions.UPDATE_MENU,
      payload: { currentMenu },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMenuByUser =
  () => async (dispatch) => {
    try {
      const [currentMenu] = await menuServices.getMenuByUser();
      dispatch({
        type: actions.GET_MENU_BY_USER,
        payload: { currentMenu },
      });
    } catch (error) {
      console.log(error);
    }
  };

const handlers = {
  [actions.CREATE_MENU]: (state, { currentMenu }) => ({
    ...state,
    currentMenu,
  }),
  [actions.GET_MENU_BY_USER]: (state, { currentMenu }) => ({
    ...state,
    currentMenu,
  }),
  [actions.UPDATE_MENU]: (state, { currentMenu }) => ({
    ...state,
    currentMenu: state.currentMenu.map((menu) => {
      if (menu._id === currentMenu._id) {
        return Object.assign(menu, currentMenu);
      }
      return menu;
    }),
  }),
};

export const menuReducer = (state = menuState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
