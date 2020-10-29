import * as constants from "./RegisterConstants";
import {
  setNotificationMessage,
  setShowNotificationMessage,
} from "../../../../components/notifications/store/notificationActions";
import config from "../../../../config";

export const RegisterAction = (params) => (dispatch) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": `application/json` },
      body: JSON.stringify(params),
    };
    dispatch({ type: constants.REQUEST_REGISTER_PENDING });
    fetch(`${config.API_URL}/micro_users/user/signup`, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw new Error(json.error);
        }
        dispatch({ type: constants.REQUEST_REGISTER_SUCCESS, payload: json.email });
      })
      .catch((error) => {
        dispatch({
          type: constants.REQUEST_REGISTER_ERROR,
          payload: error.message,
        });
        dispatch(setNotificationMessage(error.message));
        dispatch(setShowNotificationMessage(true));
      });
  };

  export const EmailConfirmed = (params) => (dispatch) => {
    const token = params.token
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": `application/json` },
    };
    dispatch({ type: constants.REQUEST_CONFIRMATION_PENDING });
    fetch(`${config.API_URL}/micro_users/user/confirm_email/${token}`, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          throw new Error(json.error);
        }
        dispatch({ type: constants.REQUEST_CONFIRMATION_SUCCESS, payload: json });
      })
      .catch((error) => {
        dispatch({
          type: constants.REQUEST_CONFIRMATION_ERROR,
          payload: error.message,
        });
        dispatch(setNotificationMessage(error.message));
        dispatch(setShowNotificationMessage(true));
      });
  };