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
  const [guestMode, setGuestMode] = useState(true);

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

  function setUserToLocalStorage(userName) {
    setGuestMode(false);
    localStorage.setItem("currentUser", userName);
  }

  function deleteUserFromLocalStorage() {
    setGuestMode(true);
    localStorage.removeItem("currentUser");
  }

  function FormOrNothing({ formType }) {
    switch (formType) {
      case "sign-in":
        return (
          <SignInForm
            setCurrForm={setCurrForm}
            setUserToLocalStorage={setUserToLocalStorage}
          />
        );
      case "sign-up":
        return (
          <SignUpForm
            setCurrForm={setCurrForm}
            setUserToLocalStorage={setUserToLocalStorage}
          />
        );
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
        guestMode={guestMode}
        deleteUserFromLocalStorage={deleteUserFromLocalStorage}
      />
      <Main />
      <Footer />
      <BurgerMenu
        isBurgerMenuOpened={burgerMenuOpened}
        setBurgerMenu={updateBurgerMenuState}
        setCurrForm={setCurrForm}
        guestMode={guestMode}
        deleteUserFromLocalStorage={deleteUserFromLocalStorage}
      />
      <FormOrNothing formType={currForm} />
    </div>
  );
}

export default App;
