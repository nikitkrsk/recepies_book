import * as constants from "./ForgotPasswordConstants";

const initialState = {
  isLoading: false,
};

export const ForgotPassword = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.REQUEST_FP_PENDING:
      return { ...state, isLoading: true };
    case constants.REQUEST_FP_SUCCESS:
      return { ...state, isLoading: false };
    case constants.REQUEST_FP_ERROR:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
