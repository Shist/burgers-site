import guestImage from "../../images/header/guest.png";
import userImage from "../../images/header/user.png";

import st from "./SignModeLabel.module.scss";

function SignModeLabel({
  extraClasses,
  guestMode,
  currUserData,
  loading,
  serverError,
}) {
  let classesStr = st["curr-user-wrapper"];
  if (extraClasses) classesStr += ` ${extraClasses}`;

  return (
    <div className={classesStr}>
      {guestMode ? (
        <span className={st["curr-user-wrapper__text"]}>Гость</span>
      ) : loading ? (
        <div className={st["curr-user-wrapper__text-sample"]}></div>
      ) : serverError ? (
        <span
          className={st["curr-user-wrapper__text-error"]}
        >{`Ошибка при загрузке пользователя: ${serverError}`}</span>
      ) : (
        <span className={st["curr-user-wrapper__text"]}>
          {currUserData?.name}
        </span>
      )}
      <img
        src={guestMode ? guestImage : userImage}
        alt="Sign In"
        className={st["curr-user-wrapper__image"]}
      />
    </div>
  );
}

export default SignModeLabel;
