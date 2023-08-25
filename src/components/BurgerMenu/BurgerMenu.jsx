import st from "./BurgerMenu.module.scss";
import "./../../styles/template.scss";

function BurgerMenu({
  isBurgerMenuOpened,
  setBurgerMenu,
  setCurrForm,
  guestMode,
  deleteUserFromLocalStorage,
}) {
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
        <h2 className={st["burger-menu__headline"]}>Menu</h2>
        <ul className={st["burger-menu__nav-list"]}>
          <li className={st["burger-menu__nav-list-item"]}>
            <a
              href="#"
              className={st["burger-menu__link"]}
              onClick={() => {
                guestMode
                  ? setCurrForm("sign-in")
                  : deleteUserFromLocalStorage();
                setBurgerMenu(false);
              }}
            >
              {guestMode ? "Войти" : "Выйти"}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default BurgerMenu;
