import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useYourMealService from "../../../services/YourMealService";
import Input from "../Input/Input";
import Spinner from "../../Spinner/Spinner";

import st from "./SignUpForm.module.scss";

function SignUpForm({ setUserToLocalStorage }) {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [repeatPasswordState, setRepeatPasswordState] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);

  const {
    loading,
    serverError,
    clearServerError,
    isUserNameFree,
    registerNewUser,
  } = useYourMealService();

  const confirmBtnClicked = (e) => {
    e.preventDefault();
    setInvalidInput(false);
    clearServerError();
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
      setInvalidInput("Пароль должен содержать хотя бы одну латинскую букву!");
    } else if (passwordState !== repeatPasswordState) {
      setInvalidInput("Введённые пароли не совпадают!");
    } else {
      isUserNameFree(loginState).then((isFree) => {
        if (isFree) {
          registerNewUser(loginState, passwordState).then((newUser) => {
            setUserToLocalStorage(newUser.name, newUser.id, newUser.password);
            navigate("/");
          });
        } else {
          setInvalidInput("Пользователь с таким именем уже существует!");
        }
      });
    }
  };

  return (
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
      {loading ? <Spinner /> : null}
      {invalidInput ? (
        <span className={st["sign-up-form__error-label"]}>{invalidInput}</span>
      ) : null}
      {serverError ? (
        <span className={st["sign-up-form__error-label"]}>{serverError}</span>
      ) : null}
      <Link
        to="/sign-in"
        className={
          loading
            ? `${st["sign-up-form__link-to-sign-in"]} ${st["sign-up-form__link-to-sign-in_disabled"]}`
            : st["sign-up-form__link-to-sign-in"]
        }
        onClick={(e) => (loading ? e.preventDefault() : null)}
      >
        Уже есть аккаунт? Войти в аккаунт
      </Link>
      <button
        className={st["sign-up-form__submit-btn"]}
        onClick={confirmBtnClicked}
        disabled={
          !loginState || !passwordState || !repeatPasswordState || loading
        }
      >
        Зарегистрировать аккаунт
      </button>
      <button
        className={st["sign-up-form__guest-mode-btn"]}
        onClick={() => navigate("/")}
        disabled={loading}
      >
        Режим гостя
      </button>
    </form>
  );
}

export default SignUpForm;
