import * as constants from "./notificationConstants";

const initialState = {
  notificationMessage: "",
  showNotificationMessage: false,
  showNotificationPopupCard: false,
  notificationSeverity: 'error'
};

export const showNotification = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.SET_NOTIFICATION_MESSAGE:
      return { ...state, notificationMessage: action.payload };
    case constants.SET_SHOW_NOTIFICATION_MESSAGE:
      return { ...state, showNotificationMessage: action.payload };
    case constants.SET_SHOW_NOTIFICATION_POPUP_CARD:
      return { ...state, showNotificationPopupCard: action.payload };
    case constants.SET_NOTIFICATION_SEVERITY:
      return { ...state, notificationSeverity: action.payload };
    default:
      return state;
  }
};
