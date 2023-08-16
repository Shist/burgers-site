import jsonData from "../../data/data.json";

import CategoriesList from "../CategoriesList/CategoriesList";
import Basket from "../Basket/Basket";
import BurgerCard from "../BurgerCard/BurgerCard";

import st from "./Main.module.scss";

function Main() {
  const layoutBurgerItemsArr = jsonData.burgerItems.map((item) => {
    const { id, ...otherProps } = item;
    return <BurgerCard key={id} {...otherProps} />;
  });

  return (
    <main className={st.main}>
      <CategoriesList
        extraClasses={st["main__categories-list"]}
        categoriesArr={jsonData.categoryItems}
      />
      <h2 className={st["main__food-headline"]}>Бургеры</h2>
      <div className={st["main__basket-menu-wrapper"]}>
        <Basket itemsArr={jsonData.basketItems} />
        <div className={st["main__menu-wrapper"]}>{layoutBurgerItemsArr}</div>
      </div>
    </main>
  );
}

export default Main;
