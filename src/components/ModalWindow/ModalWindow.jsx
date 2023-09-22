import { useState } from "react";
import { useNavigate } from "react-router-dom";

import st from "./ModalWindow.module.scss";

const ModalWindow = ({ headline, message, btnLabel, isSuccess }) => {
  const navigate = useNavigate();

  const [close, setClose] = useState(false);

  return close ? null : (
    <div
      className={st["modal-window-wrapper"]}
      onClick={(e) => {
        if (e.target.classList.contains(st["modal-window-wrapper"])) {
          setClose(true);
        }
      }}
    >
      <div className={st["modal-window-wrapper__window"]}>
        <button
          className={st["modal-window-wrapper__close-btn"]}
          onClick={() => setClose(true)}
        ></button>
        <h3 className={st["modal-window-wrapper__headline"]}>{headline}</h3>
        {isSuccess ? (
          <span className={st["modal-window-wrapper__success-text"]}>
            🥳🥳🥳
          </span>
        ) : null}
        <p className={st["modal-window-wrapper__text-info"]}>{message}</p>
        <button
          className={st["modal-window-wrapper__btn-ok"]}
          onClick={() => navigate("/")}
        >
          {btnLabel}
        </button>
      </div>
    </div>
  );
};

export default ModalWindow;
