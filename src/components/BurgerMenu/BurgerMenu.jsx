import { useNavigate } from "react-router-dom";
import SignModeLabel from "../SignModeLabel/SignModeLabel";

import st from "./BurgerMenu.module.scss";
import "./../../styles/template.scss";

function BurgerMenu({
  burgerMenu,
  setBurgerMenu,
  guestMode,
  deleteUserFromLocal,
  currUserData,
  loading,
  serverError,
}) {
  const navigate = useNavigate();
  const handleClickToDarkSpace = (e) => {
    if (e.target.classList.contains(st["burger-menu"])) {
      setBurgerMenu(false);
    }
  };

  return (
    <div
      className={`${st["burger-menu"]} ${
        burgerMenu ? "appeared-flex" : "hidden-element"
      }`}
      onClick={handleClickToDarkSpace}
    >
      <nav className={st["burger-menu__nav"]}>
        <h2 className={st["burger-menu__headline"]}>Меню</h2>
        <SignModeLabel
          extraClasses="flex-row-reverse mb30"
          guestMode={guestMode}
          currUserData={currUserData}
          loading={loading}
          serverError={serverError}
        />
        <ul className={st["burger-menu__nav-list"]}>
          <li className={st["burger-menu__nav-list-item"]}>
            <button
              className={st["burger-menu__link"]}
              onClick={() => {
                setBurgerMenu(false);
                if (!guestMode) {
                  deleteUserFromLocal();
                }
                navigate("/sign-in");
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
