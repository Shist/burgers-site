import st from "./PasswordInput.module.scss";

function PasswordInput({
  modClasses,
  passwordState,
  setPasswordState,
  placeholder,
  idName,
}) {
  // TODO Rewrite this code with adding modification classes for BasketItem in future ---> with states <---
  let classesStr = st["password-input"];
  if (modClasses) {
    modClasses.split(" ").forEach((modClass) => {
      classesStr += " ";
      classesStr += st[`password-input_${modClass}`];
    });
  }

  return (
    <input
      type="password"
      name={idName}
      className={classesStr}
      id={`${idName}Input`}
      placeholder={placeholder}
      required
      value={passwordState}
      onChange={(e) => setPasswordState(e.target.value)}
    />
  );
}

export default PasswordInput;
