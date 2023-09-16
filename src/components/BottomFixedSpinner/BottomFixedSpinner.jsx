import { useState, useEffect } from "react";

import st from "./BottomFixedSpinner.module.scss";
import "./../../styles/template.scss";

function BottomFixedSpinner({ dataIsSending }) {
  const [display, setDisplay] = useState("hidden-element");

  useEffect(() => {
    let timerId = null;
    if (dataIsSending) {
      timerId = setTimeout(() => {
        setDisplay("appeared-flex");
      }, 100);
    } else {
      setDisplay("hidden-element");
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [dataIsSending]);

  return (
    <div className={`${st["bottom-fixed-spinner"]} ${display}`}>
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
