import st from "./Spinner.module.scss";

const Spinner = ({ color }) => {
  return <div className={st[`${color}-loader`]}></div>;
};

export default Spinner;
