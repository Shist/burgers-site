import st from "./Header.module.scss";
import logoText from "../../images/header/logo-text.svg";
import logoImage from "../../images/header/logo-img.svg";
import burgerImage from "../../images/header/burger.png";

function Header() {
  return (
    <header className={st.header}>
      <div className={st["header__logo-wrapper"]}>
        <img src={logoText} alt="Your meal" className="header__logo-text" />
        <img
          src={logoImage}
          alt="Your meal logo"
          className="header__logo-image"
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
