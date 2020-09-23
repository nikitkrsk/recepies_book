import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import SelectLanguage from "../components/select_language/SelectLanguage";
// import ReduxExample from '../components/redux_example/ReduxExample'
import NavBar from "../components/navbar/index";
import { themesConfig } from "../themes/main";
import SigninPage from "./signin/index";


function App() {
  const state = useSelector((state) => ({
    theme: state.changeTheme.theme,
  }));
  const theme = createMuiTheme(themesConfig[state.theme]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />

        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <SelectLanguage {...props} />}
          />
          <Route path="/auth" render={(props) => <SigninPage {...props} />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
