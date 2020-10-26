import * as constants from "./ForgotPasswordConstants";
import {
  setNotificationMessage,
  setShowNotificationMessage,
  setNotificationSeverity
} from "../../../../components/notifications/store/notificationActions";
import config from "../../../../config";

export const FPRequest = (params) => (dispatch) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify(params),
  };
  dispatch({ type: constants.REQUEST_FP_PENDING });
  fetch(`${config.API_URL}/micro_users/reset_password/forgot_password`, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      if (json.error) {
        throw new Error(json.error);
      }
      dispatch(setNotificationMessage(json.message));
      dispatch(setNotificationSeverity('success'))
      dispatch(setShowNotificationMessage(true));
      dispatch({ type: constants.REQUEST_FP_SUCCESS, payload: json });
    })
    .catch((error) => {
      dispatch({
        type: constants.REQUEST_FP_ERROR,
        payload: error.message,
      });
      dispatch(setNotificationMessage(error.message));
      dispatch(setShowNotificationMessage(true));
    });
};