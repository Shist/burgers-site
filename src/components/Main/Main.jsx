import jsonData from "../../data/data.json";

import { useState } from "react";
import CategoriesList from "../CategoriesList/CategoriesList";
import Basket from "../Basket/Basket";
import FoodItemCard from "../FoodItemCard/FoodItemCard";

import st from "./Main.module.scss";

function Main() {
  const [currCategory, setCurrCategory] = useState(
    localStorage.getItem("currCategory")
      ? localStorage.getItem("currCategory")
      : "burgers"
  );

  const layoutFoodItemsArr = jsonData.categoryItems[
    jsonData.categoryItems.map((item) => item.labelId).indexOf(currCategory)
  ].items.map((item) => {
    const { id, ...otherProps } = item;
    return <FoodItemCard key={id} {...otherProps} labelId={currCategory} />;
  });

  return (
    <main className={st.main}>
      <CategoriesList
        extraClasses={st["main__categories-list"]}
        currCategory={currCategory}
        setCurrCategory={setCurrCategory}
      />
      <h2 className={st["main__food-headline"]}>
        {
          jsonData.categoryItems[
            jsonData.categoryItems
              .map((item) => item.labelId)
              .indexOf(currCategory)
          ].label
        }
      </h2>
      <div className={st["main__basket-menu-wrapper"]}>
        <Basket />
        <div className={st["main__menu-wrapper"]}>{layoutFoodItemsArr}</div>
      </div>
    </main>
  );
}

export default Main;
