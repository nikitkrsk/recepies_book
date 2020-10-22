import jwt_decode from "jwt-decode";

import * as constants from "./LoginConstants";
import {
  setNotificationMessage,
  setShowNotificationMessage,
} from "../../../../components/notifications/store/notificationActions";
import config from "../../../../config";

export const LoginAction = (params) => (dispatch) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify(params),
  };
  dispatch({ type: constants.REQUEST_SIGNIN_PENDING });
  fetch(`${config.API_URL}/micro_users/auth/signin`, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      if (json.error) {
        throw new Error(json.error);
      }
      let role = "guest";
      try {
        var decoded = jwt_decode(json.token);
        role = decoded.role;
      } catch {
        role = "guest";
      }
      dispatch({ type: constants.REQUEST_SIGNIN_SUCCESS, payload: json });
      dispatch({ type: constants.SET_USER_ROLE, payload: role });
    })
    .catch((error) => {
      dispatch({
        type: constants.REQUEST_SIGNIN_ERROR,
        payload: error.message,
      });
      dispatch(setNotificationMessage(error.message));
      dispatch(setShowNotificationMessage(true));
    });
};

export const LogoutAction = (params) => (dispatch) => {
  console.log(params)
  //TODO LOGOUT METHOD
  dispatch({ type: constants.REQUEST_SIGNOUT_SUCCESS, payload: "ok" });
};
