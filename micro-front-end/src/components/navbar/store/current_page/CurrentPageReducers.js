import * as constants from "./CurrentPageConstants";

const initialState = {
  currentPage: 'Home',
};

export const changeCurrentPage = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.SET_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

