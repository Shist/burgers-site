import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

import "./App.scss";

function App() {
  const [burgerMenuOpened, updateBurgerMenuState] = useState(false);

  const TABLET_WIDTH = 768;
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > TABLET_WIDTH) {
        updateBurgerMenuState(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app">
      <Header
        isBurgerMenuOpened={burgerMenuOpened}
        toggleBurgerMenu={updateBurgerMenuState}
      />
      <Main />
      <Footer />
      <BurgerMenu isBurgerMenuOpened={burgerMenuOpened} />
    </div>
  );
}

export default App;
