import st from "./LoginInput.module.scss";

function LoginInput({ extraClasses, loginState, setLoginState, idName }) {
  let classesStr = st["login-input"];
  if (extraClasses) classesStr += ` ${extraClasses}`;

  return (
    <input
      type="text"
      name={idName}
      className={classesStr}
      id={`${idName}Input`}
      placeholder="Введите логин"
      required
      value={loginState}
      onChange={(e) => setLoginState(e.target.value)}
    />
  );
}

export default LoginInput;
