import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import I18n from "redux-i18n";
import { PersistGate } from "redux-persist/integration/react";

import * as serviceWorker from "./serviceWorker";
import App from "./containers/App";

import { store, persistor } from "./store/CombinedReducers";
import { translations } from "./translations/Translation";

ReactDOM.render(
  <Provider store={store}>
    <I18n translations={translations}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </I18n>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
