import st from "./Input.module.scss";

function Input({
  extraClasses,
  inputState,
  setInputState,
  type,
  idName,
  placeholder,
}) {
  let classesStr = st["input"];
  if (extraClasses) classesStr += ` ${extraClasses}`;

  return (
    <input
      type={type}
      name={idName}
      className={classesStr}
      id={idName}
      placeholder={placeholder}
      required
      value={inputState}
      onChange={(e) => setInputState(e.target.value)}
    />
  );
}

export default Input;
