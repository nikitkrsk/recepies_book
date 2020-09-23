import * as constants from "./MenuOpenConstants";

export const setMenuOpen = (bool) => ({
  type: constants.SET_MENU_OPEN,
  payload: bool
});

