import { useState } from "react";
import LoginInput from "../LoginInput/LoginInput";
import PasswordInput from "../PasswordInput/PasswordInput";

import st from "./SignUpForm.module.scss";

function SignUpForm() {
  const [loginState, setLoginState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [repeatPasswordState, setRepeatPasswordState] = useState("");

  return (
    /* This wrapper will be removed in future when forms will be moved to other pages */
    <div className={st["sign-up-form-wrapper"]}>
      <form action="#" className={st["sign-up-form"]}>
        <h2 className={st["sign-up-form__headline"]}>Регистрация</h2>
        <LoginInput
          modClasses="mb10"
          loginState={loginState}
          setLoginState={setLoginState}
        />
        <PasswordInput
          modClasses="mb10"
          passwordState={passwordState}
          setPasswordState={setPasswordState}
          placeholder="Введите пароль"
        />
        <PasswordInput
          modClasses="mb10"
          passwordState={repeatPasswordState}
          setPasswordState={setRepeatPasswordState}
          placeholder="Повторите пароль"
        />
        <a href="#" className={st["sign-up-form__link-to-sign-in"]}>
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
