import { useNavigate } from "react-router-dom";
import SignModeLabel from "../SignModeLabel/SignModeLabel";

import st from "./BurgerMenu.module.scss";
import "./../../styles/template.scss";

function BurgerMenu({
  isBurgerMenuOpened,
  setBurgerMenu,
  guestMode,
  deleteUserFromLocalStorage,
}) {
  const navigate = useNavigate();
  const handleClickToDarkSpace = (e) => {
    if (e.target.classList.contains(st["burger-menu"])) {
      setBurgerMenu(false);
    }
  };

  // TODO - Rewrite this link to needed page (instead of "#") after learning Routings
  return (
    <div
      className={`${st["burger-menu"]} ${
        isBurgerMenuOpened ? "appeared-flex" : "hidden-element"
      }`}
      onClick={handleClickToDarkSpace}
    >
      <nav className={st["burger-menu__nav"]}>
        <h2 className={st["burger-menu__headline"]}>Меню</h2>
        <SignModeLabel
          extraClasses="flex-row-reverse mb30"
          guestMode={guestMode}
        />
        <ul className={st["burger-menu__nav-list"]}>
          <li className={st["burger-menu__nav-list-item"]}>
            <button
              className={st["burger-menu__link"]}
              onClick={() => {
                guestMode ? navigate("sign-in") : deleteUserFromLocalStorage();
                setBurgerMenu(false);
              }}
            >
              {guestMode ? "Войти" : "Выйти"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default BurgerMenu;
