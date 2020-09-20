import React from "react";
import { useSelector } from "react-redux";

// import SelectLanguage from '../components/select_language/SelectLanguage'
// import ReduxExample from '../components/redux_example/ReduxExample'
import BurgerMenu from "../components/burger_menu/BurgerMenu";
import { themesConfig } from "../themes/main";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

function App() {
  const state = useSelector((state) => ({
    theme: state.changeTheme.theme,
  }));
  const theme = createMuiTheme(themesConfig[state.theme]);

  return (
    <ThemeProvider theme={theme}>
      <BurgerMenu />
      {/* <SelectLanguage />
      <ReduxExample /> */}
    </ThemeProvider>
  );
}

export default App;
