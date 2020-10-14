import * as constants from "./LoginConstants";
import {setNotificationMessage, setShowNotificationMessage } from '../../../../components/notifications/store/notificationActions'
import  config  from "../../../../config";

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
      console.log(json)

      if (json.error) {
        throw new Error(json.error);
      }
      dispatch({ type: constants.REQUEST_SIGNIN_SUCCESS, payload: json });
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
