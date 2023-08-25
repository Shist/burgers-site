import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import SignInForm from "../Forms/SignInForm/SignInForm";
import SignUpForm from "../Forms/SignUpForm/SignUpForm";

import "./App.scss";

function App() {
  const [burgerMenuOpened, updateBurgerMenuState] = useState(false);
  const [currForm, setCurrForm] = useState("none");

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

  function FormOrNothing({ formType }) {
    switch (formType) {
      case "sign-in":
        return <SignInForm setCurrForm={setCurrForm} />;
      case "sign-up":
        return <SignUpForm setCurrForm={setCurrForm} />;
      default:
        return null;
    }
  }

  return (
    <div className="app">
      <Header
        isBurgerMenuOpened={burgerMenuOpened}
        toggleBurgerMenu={updateBurgerMenuState}
        setCurrForm={setCurrForm}
      />
      <Main />
      <Footer />
      <BurgerMenu
        isBurgerMenuOpened={burgerMenuOpened}
        toggleBurgerMenu={updateBurgerMenuState}
        setCurrForm={setCurrForm}
      />
      <FormOrNothing formType={currForm} />
    </div>
  );
}

export default App;
