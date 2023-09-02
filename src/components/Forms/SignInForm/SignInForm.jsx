import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../Input/Input";

import st from "./SignInForm.module.scss";

function SignInForm({ setUserToLocalStorage }) {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  return (
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
      <Link to="/sign-up" className={st["sign-in-form__link-to-sign-up"]}>
        Ещё не зарегистрированы? Создать аккаунт
      </Link>
      <button
        className={st["sign-in-form__submit-btn"]}
        onClick={(e) => {
          e.preventDefault();
          setUserToLocalStorage(loginState);
          navigate("/");
        }}
      >
        Войти в аккаунт
      </button>
    </form>
  );
}

export default SignInForm;
