import * as constants from "./ChooseThemeConstants";

export const setTheme = (theme) => ({
  type: constants.SET_THEME,
  payload: theme
});

