import st from "./FullPageSpinner.module.scss";
import "./../../styles/template.scss";

function FullPageSpinner(dataIsSending) {
  return (
    <div
      className={`${st["full-page-spinner"]} ${
        dataIsSending ? "appeared-flex" : "hidden-element"
      }`}
    >
      <h2 className={st["full-page-spinner__headline"]}>
        Отправка данных на сервер
      </h2>
      <div class={st["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default FullPageSpinner;
