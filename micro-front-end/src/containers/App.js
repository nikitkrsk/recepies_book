import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, withRouter } from "react-router-dom";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

// import ReduxExample from '../components/redux_example/ReduxExample'
import NavBar from "../components/navbar/index";
import { themesConfig } from "../themes/main";
import { Routes } from "../components/routes/routes";
import { ProtectedRoute } from "../helpers/protectedRoute";
import { setCurrentPage } from "../components/navbar/store/current_page/CurrentPageActions";
import config from "../config";
function App({ match, history }) {
  const state = useSelector((state) => ({
    theme: state.changeTheme.theme,
  }));
  const theme = createMuiTheme(themesConfig[state.theme]);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `${
      Routes.filter((el) => el.path === history.location.pathname)[0].name
    } - ${config.DOMAIN} `;
    dispatch(setCurrentPage(history.location.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname]);

  const routeComponents = Routes.map(
    ({ path, component, usersCanSee }, key) => (
      <ProtectedRoute
        exact
        users={usersCanSee}
        path={path}
        component={component}
        key={key}
      />
    )
  );
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Switch>{routeComponents}</Switch>
    </ThemeProvider>
  );
}

export default withRouter(App);
