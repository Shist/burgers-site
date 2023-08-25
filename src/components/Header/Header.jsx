import signInImage from "../../images/header/sign-in.png";
import signOutImage from "../../images/header/sign-out.png";
import logoText from "../../images/header/logo-text.svg";
import logoImage from "../../images/header/logo-img.svg";
import burgerImage from "../../images/header/burger.png";

import st from "./Header.module.scss";

function Header({
  isBurgerMenuOpened,
  toggleBurgerMenu,
  setCurrForm,
  guestMode,
  deleteUserFromLocalStorage,
}) {
  return (
    <header className={st.header}>
      <div
        className={st["header__sign-in-wrapper"]}
        onClick={() => {
          guestMode ? setCurrForm("sign-in") : deleteUserFromLocalStorage();
        }}
      >
        <span className={st["header__sign-in-text"]}>
          {guestMode ? "Войти" : "Выйти"}
        </span>
        <img
          src={guestMode ? signInImage : signOutImage}
          alt="Sign In"
          className={st["header__sign-in-image"]}
        />
      </div>
      <button
        className={`${st["header__burger-menu-btn"]} ${
          isBurgerMenuOpened
            ? st["header__burger-menu-btn_close"]
            : st["header__burger-menu-btn_open"]
        }`}
        onClick={() => toggleBurgerMenu((isOpened) => !isOpened)}
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
