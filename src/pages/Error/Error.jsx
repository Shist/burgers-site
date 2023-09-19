import { Link } from "react-router-dom";
import withHeaderAndFooter from "../../hoc/withHeaderAndFooter";

import st from "./Error.module.scss";

function Error() {
  return (
    <main className={st["error"]}>
      <h2 className={st["error__headline"]}>Такой страницы не существует</h2>
      <span className={st["error__text"]}>
        Пожалуйста, перепроверьте адрес, по которому вы перешли.
      </span>
      <Link to="/" className={st["error__link-to-home"]}>
        На главную
      </Link>
    </main>
  );
}

export default withHeaderAndFooter(Error);
