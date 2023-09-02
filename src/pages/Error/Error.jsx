import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";

import st from "./Error.module.scss";

function Error({ guestMode, deleteUserFromLocalStorage }) {
  const [burgerMenu, setBurgerMenu] = useState(false);

  const TABLET_WIDTH = 768;
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > TABLET_WIDTH) {
        setBurgerMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header
        burgerMenu={burgerMenu}
        setBurgerMenu={setBurgerMenu}
        guestMode={guestMode}
        deleteUserFromLocalStorage={deleteUserFromLocalStorage}
      />
      <main className={st["error"]}>
        <h2 className={st["error__headline"]}>Такой страницы не существует</h2>
        <span className={st["error__text"]}>
          Пожалуйста, перепроверьте адрес, по которому вы перешли.
        </span>
      </main>
      <Footer />
      <BurgerMenu
        burgerMenu={burgerMenu}
        setBurgerMenu={setBurgerMenu}
        guestMode={guestMode}
        deleteUserFromLocalStorage={deleteUserFromLocalStorage}
      />
    </>
  );
}

export default Error;
