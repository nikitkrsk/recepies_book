import * as constants from "./LoginConstants";

const initialState = {
  user: {},
  isLoading: false,
};

export const loginUser = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.REQUEST_SIGNIN_PENDING:
      return { ...state, isLoading: true };
    case constants.REQUEST_SIGNIN_SUCCESS:
      return { ...state, user: action.payload, isLoading: false };
    case constants.REQUEST_SIGNIN_ERROR:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
