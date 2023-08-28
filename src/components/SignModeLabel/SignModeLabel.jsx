import guestImage from "../../images/header/guest.png";
import userImage from "../../images/header/user.png";

import st from "./SignModeLabel.module.scss";

function SignModeLabel({ extraClasses, guestMode }) {
  let classesStr = st["curr-user-wrapper"];
  if (extraClasses) classesStr += ` ${extraClasses}`;

  return (
    <div className={classesStr}>
      <span className={st["curr-user-wrapper__text"]}>
        {guestMode ? "Гость" : localStorage.getItem("currentUser")}
      </span>
      <img
        src={guestMode ? guestImage : userImage}
        alt="Sign In"
        className={st["curr-user-wrapper__image"]}
      />
    </div>
  );
}

export default SignModeLabel;
