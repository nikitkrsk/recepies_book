import * as constants from "./LoginConstants";

const initialState = {
  user: {},
  token: "",
  role: "guest",
  refreshToken: "",
  isLoading: false,
};

export const loginUser = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.REQUEST_SIGNIN_PENDING:
      return { ...state, isLoading: true };
    case constants.REQUEST_SIGNIN_SUCCESS:
      return { ...state, user: action.payload.user, token: action.payload.token, refreshToken: action.payload.refreshToken, isLoading: false };
    case constants.REQUEST_SIGNIN_ERROR:
      return { ...state, isLoading: false };
    case constants.SET_USER_ROLE:
      return { ...state, role: action.payload };
    default:
      return state;
  }
};
