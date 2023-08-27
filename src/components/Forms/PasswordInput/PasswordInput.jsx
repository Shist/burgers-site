import st from "./PasswordInput.module.scss";

function PasswordInput({
  extraClasses,
  passwordState,
  setPasswordState,
  placeholder,
  idName,
}) {
  let classesStr = st["password-input"];
  if (extraClasses) classesStr += ` ${extraClasses}`;

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
