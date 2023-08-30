import { useState } from "react";
import Input from "../Input/Input";

import st from "./SignInForm.module.scss";

function SignInForm({ setCurrForm, setUserToLocalStorage }) {
  const [loginState, setLoginState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  const handleClickToDarkSpace = (e) => {
    if (e.target.classList.contains(st["sign-in-form-wrapper"])) {
      setCurrForm("none");
    }
  };

  return (
    /* This wrapper will be removed in future when forms will be moved to other pages */
    <div
      className={st["sign-in-form-wrapper"]}
      onClick={handleClickToDarkSpace}
    >
      <form action="#" className={st["sign-in-form"]}>
        <h2 className={st["sign-in-form__headline"]}>Авторизация</h2>
        <Input
          extraClasses="mb10"
          inputState={loginState}
          setInputState={setLoginState}
          type="text"
          idName="loginInput"
          placeholder="Введите логин"
        />
        <Input
          extraClasses="mb10"
          inputState={passwordState}
          setInputState={setPasswordState}
          type="password"
          idName="passwordInput"
          placeholder="Введите пароль"
        />
        <a
          href="#"
          className={st["sign-in-form__link-to-sign-up"]}
          onClick={() => setCurrForm("sign-up")}
        >
          Ещё не зарегистрированы? Создать аккаунт
        </a>
        <button
          className={st["sign-in-form__submit-btn"]}
          onClick={(e) => {
            e.preventDefault();
            setUserToLocalStorage(loginState);
            setCurrForm("none");
          }}
        >
          Войти в аккаунт
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
