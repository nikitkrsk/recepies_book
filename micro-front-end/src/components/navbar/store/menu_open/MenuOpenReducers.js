import * as constants from "./MenuOpenConstants";

const initialState = {
  menuOpen: false,
};

export const changeMenuOpen = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.SET_MENU_OPEN:
      return { ...state, menuOpen: action.payload };
    default:
      return state;
  }
};

