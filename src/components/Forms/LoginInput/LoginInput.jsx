import st from "./LoginInput.module.scss";

function LoginInput({ modClasses, loginState, setLoginState, idName }) {
  // TODO Rewrite this code with adding modification classes for BasketItem in future ---> with states <---
  let classesStr = st["login-input"];
  if (modClasses) {
    modClasses.split(" ").forEach((modClass) => {
      classesStr += " ";
      classesStr += st[`login-input_${modClass}`];
    });
  }

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
