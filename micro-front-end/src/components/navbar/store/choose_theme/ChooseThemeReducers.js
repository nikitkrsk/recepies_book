import * as constants from "./ChooseThemeConstants";

const initialState = {
  theme: "legacy",
};

export const changeTheme = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.SET_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

