import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

import "./App.scss";

function App() {
  const [burgerMenuOpened, updateBurgerMenuState] = useState(false);

  return (
    <div className="app">
      <Header toggleBurgerMenu={updateBurgerMenuState} />
      <Main />
      <Footer />
      <BurgerMenu isBurgerMenuOpened={burgerMenuOpened} />
    </div>
  );
}

export default App;
