import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Home, SignIn, SignUp, Error } from "../index";
import Footer from "../../components/Footer/Footer";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";

import "./App.scss";

function App() {
  const [burgerMenuOpened, updateBurgerMenuState] = useState(false);
  const [guestMode, setGuestMode] = useState(
    localStorage.getItem("currentUser") === null ? true : false
  );

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

  return (
    <div className="app">
      <Router>
        <Header
          isBurgerMenuOpened={burgerMenuOpened}
          toggleBurgerMenu={updateBurgerMenuState}
          guestMode={guestMode}
          deleteUserFromLocalStorage={deleteUserFromLocalStorage}
        />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/sign-in"
              element={<SignIn setUserToLocalStorage={setUserToLocalStorage} />}
            />
            <Route
              path="/sign-up"
              element={<SignUp setUserToLocalStorage={setUserToLocalStorage} />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <Footer />
        <BurgerMenu
          isBurgerMenuOpened={burgerMenuOpened}
          setBurgerMenu={updateBurgerMenuState}
          guestMode={guestMode}
          deleteUserFromLocalStorage={deleteUserFromLocalStorage}
        />
      </Router>
    </div>
  );
}

export default App;
