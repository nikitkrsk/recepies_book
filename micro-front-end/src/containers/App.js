import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

// import ReduxExample from '../components/redux_example/ReduxExample'
import NavBar from "../components/navbar/index";
import { themesConfig } from "../themes/main";
import { Routes } from "../components/routes/routes";
import { ProtectedRoute } from "../helpers/protectedRoute";
function App() {
  const state = useSelector((state) => ({
    theme: state.changeTheme.theme,
  }));
  const theme = createMuiTheme(themesConfig[state.theme]);
  const routeComponents = Routes.map(({path, component, usersCanSee}, key) => <ProtectedRoute exact users={usersCanSee} path={path} component={component} key={key} />);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Switch>
          {routeComponents}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
