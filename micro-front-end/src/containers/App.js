import React from 'react';


// import SelectLanguage from '../components/select_language/SelectLanguage'
// import ReduxExample from '../components/redux_example/ReduxExample'
import BurgerMenu from '../components/burger_menu/BurgerMenu';
import { themesConfig } from "../themes/main";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

function App() {
  const theme = createMuiTheme(themesConfig.light1);

  return (
    <ThemeProvider theme={theme}>
      <BurgerMenu />
      {/* <SelectLanguage />
      <ReduxExample /> */}
    </ThemeProvider>
  );
}

export default App;
