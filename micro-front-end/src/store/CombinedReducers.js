import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  changeExampleData,
  changeExampleDataPersisted,
} from "../components/redux_example/store/exampleReducers";
import { changeTheme } from "../components/burger_menu/store/ChooseThemeReducers";

import { i18nState } from "redux-i18n";
const persistConfig = {
  key: "someData",
  whitelist: ["changeExampleDataPersisted", "changeTheme"],
  storage,
};

const rootReducer = combineReducers({
  changeExampleDataPersisted,
  changeTheme,
  changeExampleData,
  i18nState,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export { store, persistor };
