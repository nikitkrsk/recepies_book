import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { i18nState } from "redux-i18n";

import {
  changeExampleData,
  changeExampleDataPersisted,
} from "../components/redux_example/store/exampleReducers";
import { changeTheme } from "../components/navbar/store/choose_theme/ChooseThemeReducers";
import { changeMenuOpen } from "../components/navbar/store/menu_open/MenuOpenReducers";
import { changeCurrentPage } from "../components/navbar/store/current_page/CurrentPageReducers";
import { loginUser } from "../containers/signin/login_page/store/LoginReducers";
const persistConfig = {
  key: "someData",
  whitelist: [
    "changeExampleDataPersisted",
    "changeTheme",
    "changeCurrentPage",
    "loginUser",
  ],
  storage,
};

const rootReducer = combineReducers({
  changeExampleDataPersisted,
  changeMenuOpen,
  changeTheme,
  changeCurrentPage,
  loginUser,
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
