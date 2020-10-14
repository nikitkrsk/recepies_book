import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationMessage, setShowNotificationMessage, setNotificationSeverity } from "./store/notificationActions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export function PageNotifications() {

  const state = useSelector(state => ({
    notificationMessage: state.showNotification.notificationMessage,
    notificationSeverity: state.showNotification.notificationSeverity,
    showNotificationMessage: state.showNotification.showNotificationMessage
  }));
  const dispatch = useDispatch();



  const vertical = "top";
  const horizontal = "right";

  const handleClose = () => {
    dispatch(setNotificationMessage(''))
    dispatch(setNotificationSeverity('error'))
    dispatch(setShowNotificationMessage(false))
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
      open={state.showNotificationMessage}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={state.notificationSeverity}>
        {state.notificationMessage}
      </Alert>
    </Snackbar>
  );
}
