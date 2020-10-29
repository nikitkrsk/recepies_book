import * as constants from "./RegisterConstants";

const initialState = {
  isLoading: false,
  email: "",
  confirmEmailMessage: "",
  registerStatus: false
};

export const registerUser = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.REQUEST_REGISTER_PENDING:
      return { ...state, isLoading: true };
    case constants.REQUEST_REGISTER_SUCCESS:
      return { ...state, isLoading: false, registerStatus: true, email: action.payload };
    case constants.REQUEST_REGISTER_ERROR:
      return { ...state, isLoading: false };
      case constants.REQUEST_CONFIRMATION_PENDING:
      return { ...state, isLoading: true };
    case constants.REQUEST_CONFIRMATION_SUCCESS:
      return { ...state, isLoading: false, confirmEmailMessage: action.payload };
    case constants.REQUEST_CONFIRMATION_ERROR:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
