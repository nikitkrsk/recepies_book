import * as constants from "./CurrentPageConstants";

export const setCurrentPage = (string) => ({
  type: constants.SET_PAGE,
  payload: string
});

