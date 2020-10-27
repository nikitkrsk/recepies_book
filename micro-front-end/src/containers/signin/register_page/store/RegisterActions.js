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
        dispatch({ type: constants.REQUEST_REGISTER_SUCCESS, payload: json });
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