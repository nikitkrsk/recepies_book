import * as constants from "./RegisterConstants";

const initialState = {
  isLoading: false,
};

export const registerUser = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.REQUEST_REGISTER_PENDING:
      return { ...state, isLoading: true };
    case constants.REQUEST_REGISTER_SUCCESS:
      return { ...state, isLoading: false };
    case constants.REQUEST_REGISTER_ERROR:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
