import React from 'react';


import SelectLanguage from '../components/select_language/SelectLanguage'
import ReduxExample from '../components/redux_example/ReduxExample'
import BurgerMenu from '../components/burger_menu/BurgerMenu';

function App() {
  return (
    <div>
      <BurgerMenu />
      <SelectLanguage />
      <ReduxExample />
    </div>
  );
}

export default App;
