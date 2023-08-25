import { useState } from "react";
import LoginInput from "../LoginInput/LoginInput";
import PasswordInput from "../PasswordInput/PasswordInput";

import st from "./SignUpForm.module.scss";

function SignUpForm({ setCurrForm }) {
  const [loginState, setLoginState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [repeatPasswordState, setRepeatPasswordState] = useState("");

  const handleClickToDarkSpace = (e) => {
    if (e.target.classList.contains(st["sign-up-form-wrapper"])) {
      setCurrForm("none");
    }
  };

  return (
    /* This wrapper will be removed in future when forms will be moved to other pages */
    <div
      className={st["sign-up-form-wrapper"]}
      onClick={handleClickToDarkSpace}
    >
      <form action="#" className={st["sign-up-form"]}>
        <h2 className={st["sign-up-form__headline"]}>Регистрация</h2>
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
        <PasswordInput
          modClasses="mb10"
          passwordState={repeatPasswordState}
          setPasswordState={setRepeatPasswordState}
          placeholder="Повторите пароль"
          idName="repeatPassword"
        />
        <a
          href="#"
          className={st["sign-up-form__link-to-sign-in"]}
          onClick={() => setCurrForm("sign-in")}
        >
          Уже есть аккаунт? Войти в аккаунт
        </a>
        <button className={st["sign-up-form__submit-btn"]}>
          Зарегистрировать аккаунт
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
