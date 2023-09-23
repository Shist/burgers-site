import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useYourMealService from "../../../services/YourMealService";
import Input from "../Input/Input";
import Spinner from "../../Spinner/Spinner";

import st from "./SignInForm.module.scss";

function SignInForm({ setUserToLocal }) {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);

  const { loading, serverError, clearServerError, getUserByName } =
    useYourMealService();

  const confirmBtnClicked = (e) => {
    e.preventDefault();
    setInvalidInput(false);
    clearServerError();
    getUserByName(loginState).then((user) => {
      if (user) {
        if (user.password === passwordState) {
          setUserToLocal(user);
          navigate("/");
        } else {
          setInvalidInput(
            "Пользователь с таким именем существует, но пароль указан неверно!"
          );
        }
      } else {
        setInvalidInput("Пользователя с таким именем не зарегистрировано!");
      }
    });
  };

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
      {loading ? <Spinner color="white" mbClass="mb20" /> : null}
      {invalidInput ? (
        <span className={st["sign-in-form__error-label"]}>{invalidInput}</span>
      ) : null}
      {serverError ? (
        <span
          className={st["sign-in-form__error-label"]}
        >{`Ошибка при попытке авторизации: ${serverError}`}</span>
      ) : null}
      <Link
        to="/sign-up"
        className={
          loading
            ? `${st["sign-in-form__link-to-sign-up"]} ${st["sign-in-form__link-to-sign-up_disabled"]}`
            : st["sign-in-form__link-to-sign-up"]
        }
        onClick={(e) => (loading ? e.preventDefault() : null)}
      >
        Ещё не зарегистрированы? Создать аккаунт
      </Link>
      <button
        className={st["sign-in-form__submit-btn"]}
        onClick={confirmBtnClicked}
        disabled={!loginState || !passwordState || loading}
      >
        Войти в аккаунт
      </button>
      <button
        className={st["sign-in-form__guest-mode-btn"]}
        onClick={() => navigate("/")}
        disabled={loading}
      >
        Режим гостя
      </button>
    </form>
  );
}

export default SignInForm;
