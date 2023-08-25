import { useState } from "react";
import LoginInput from "../LoginInput/LoginInput";
import PasswordInput from "../PasswordInput/PasswordInput";

import st from "./SignInForm.module.scss";

function SignInForm({ setCurrForm }) {
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
        <LoginInput
          modClasses="mb10"
          loginState={loginState}
          setLoginState={setLoginState}
          idName="login"
        />
        <PasswordInput
          modClasses="mb10"
          passwordState={passwordState}
          setPasswordState={setPasswordState}
          placeholder="Введите пароль"
          idName="password"
        />
        <a
          href="#"
          className={st["sign-in-form__link-to-sign-up"]}
          onClick={() => setCurrForm("sign-up")}
        >
          Ещё не зарегистрированы? Создать аккаунт
        </a>
        <button className={st["sign-in-form__submit-btn"]}>
          Войти в аккаунт
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
