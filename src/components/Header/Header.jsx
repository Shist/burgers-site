import { useNavigate } from "react-router-dom";
import SignModeLabel from "../SignModeLabel/SignModeLabel";

import signInImage from "../../images/header/sign-in.png";
import signOutImage from "../../images/header/sign-out.png";
import logoText from "../../images/header/logo-text.svg";
import logoImage from "../../images/header/logo-img.svg";
import burgerImage from "../../images/header/burger.png";

import st from "./Header.module.scss";

function Header({ burgerMenu, setBurgerMenu, guestMode, deleteUserFromLocal }) {
  const navigate = useNavigate();

  return (
    <header className={st.header}>
      <div className={st["header__sign-in-wrapper"]}>
        <SignModeLabel guestMode={guestMode} />
        <div
          className={st["header__sign-in-btn-wrapper"]}
          onClick={() => {
            if (!guestMode) {
              deleteUserFromLocal();
            }
            navigate("/sign-in");
          }}
        >
          <span className={st["header__sign-in-text"]}>
            {guestMode ? "Войти" : "Выйти"}
          </span>
          <img
            src={guestMode ? signInImage : signOutImage}
            alt={guestMode ? "Sign In" : "Sign Out"}
            className={st["header__sign-in-image"]}
          />
        </div>
      </div>
      <button
        className={`${st["header__burger-menu-btn"]} ${
          burgerMenu
            ? st["header__burger-menu-btn_close"]
            : st["header__burger-menu-btn_open"]
        }`}
        onClick={() => setBurgerMenu((isOpened) => !isOpened)}
      ></button>
      <div className={st["header__logo-wrapper"]}>
        <img
          src={logoText}
          alt="Your meal"
          className={st["header__logo-text"]}
        />
        <img
          src={logoImage}
          alt="Your meal logo"
          className={st["header__logo-image"]}
        />
      </div>
      <div className={st["header__main-headline-wrapper"]}>
        <img
          src={burgerImage}
          alt="Burger"
          className={st["header__burger-img"]}
        />
        <div className={st["header__headline-text-wrapper"]}>
          <h1 className={st["header__main-headline"]}>
            Только самые{" "}
            <span className={st["header__main-headline_orange"]}>
              сочные бургеры!
            </span>
          </h1>
          <span className={st["header__free-delivery-text"]}>
            Бесплатная доставка от{" "}
            <span className={st["header__free-delivery-text_bold"]}>599₽</span>
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
