import { useState } from "react";
import Input from "../Input/Input";

import st from "./SignUpForm.module.scss";

function SignUpForm({ setCurrForm, setUserToLocalStorage }) {
  const [loginState, setLoginState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [repeatPasswordState, setRepeatPasswordState] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);

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
        <Input
          extraClasses="mb10"
          inputState={repeatPasswordState}
          setInputState={setRepeatPasswordState}
          type="password"
          idName="repeatPasswordInput"
          placeholder="Повторите пароль"
        />
        {invalidInput ? (
          <span className={st["sign-up-form__error-label"]}>
            {invalidInput}
          </span>
        ) : null}
        <a
          href="#"
          className={st["sign-up-form__link-to-sign-in"]}
          onClick={() => setCurrForm("sign-in")}
        >
          Уже есть аккаунт? Войти в аккаунт
        </a>
        <button
          className={st["sign-up-form__submit-btn"]}
          onClick={(e) => {
            e.preventDefault();
            if (loginState.indexOf(" ") >= 0) {
              setInvalidInput("Логин не должен содержать пробелов!");
            } else if (loginState.length > 8) {
              setInvalidInput("Логин не должен содержать более 8 символов!");
            } else if (loginState.length < 3) {
              setInvalidInput("Логин должен содержать хотя бы 3 символа!");
            } else if (passwordState.length > 22) {
              setInvalidInput("Пароль не должен содержать более 22 символов!");
            } else if (passwordState.length < 8) {
              setInvalidInput("Пароль должен содержать хотя бы 8 символов!");
            } else if (!/\d/.test(passwordState)) {
              setInvalidInput("Пароль должен содержать хотя бы одну цифру!");
            } else if (!/[a-zA-Z]/.test(passwordState)) {
              setInvalidInput(
                "Пароль должен содержать хотя бы одну латинскую букву!"
              );
            } else if (passwordState !== repeatPasswordState) {
              setInvalidInput("Введённые пароли не совпадают!");
            } else {
              setUserToLocalStorage(loginState);
              setInvalidInput(false);
              setCurrForm("none");
            }
          }}
        >
          Зарегистрировать аккаунт
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
