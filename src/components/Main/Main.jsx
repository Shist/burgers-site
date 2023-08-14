import st from "./Main.module.scss";
import CategoriesList from "./CategoriesList/CategoriesList";

function Main() {
  return (
    <main className={st.main}>
      <CategoriesList extraClasses={st["main__categories-list"]} />
    </main>
  );
}

export default Main;
