import st from "./Spinner.module.scss";

const Spinner = ({ color, mbClass }) => {
  let classNameStr = st[`${color}-loader`];
  if (mbClass) {
    classNameStr += ` ${mbClass}`;
  }
  return <div className={classNameStr}></div>;
};

export default Spinner;
