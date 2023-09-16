import st from "./BottomFixedSpinner.module.scss";
import "./../../styles/template.scss";

function BottomFixedSpinner({ dataIsSending }) {
  return (
    <div
      className={`${st["bottom-fixed-spinner"]} ${
        dataIsSending ? "appeared-flex" : "hidden-element"
      }`}
    >
      <h2 className={st["bottom-fixed-spinner__headline"]}>
        Отправка данных на сервер
      </h2>
      <div className={st["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default BottomFixedSpinner;
