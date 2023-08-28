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

  const [basketData, setBasketData] = useState({
    burger2: {
      uniqueCategoryId: "burgers",
      uniqueFoodKey: "burger2",
      label: "Супер сырный",
      weight: 512,
      price: 550,
      amount: 1,
    },
    snack2: {
      uniqueCategoryId: "snacks",
      uniqueFoodKey: "snack2",
      label: "Картошка фри",
      weight: 180,
      price: 245,
      amount: 2,
    },
    hotDog2: {
      uniqueCategoryId: "hotDogs",
      uniqueFoodKey: "hotDog2",
      label: "Жгучий хот-дог",
      weight: 245,
      price: 239,
      amount: 1,
    },
  });

  const categoryIdInArr = jsonData.categoryItems
    .map((item) => item.uniqueCategoryId)
    .indexOf(currCategory);

  const layoutFoodItemsArr = jsonData.categoryItems[categoryIdInArr].items.map(
    (item) => {
      const { uniqueFoodKey, ...otherProps } = item;
      return (
        <FoodItemCard
          key={uniqueFoodKey}
          uniqueCategoryId={currCategory}
          uniqueFoodKey={uniqueFoodKey}
          {...otherProps}
          setBasketData={setBasketData}
        />
      );
    }
  );

  return (
    <main className={st.main}>
      <CategoriesList
        extraClasses={st["main__categories-list"]}
        currCategory={currCategory}
        setCurrCategory={setCurrCategory}
      />
      <h2 className={st["main__food-headline"]}>
        {jsonData.categoryItems[categoryIdInArr].label}
      </h2>
      <div className={st["main__basket-menu-wrapper"]}>
        <Basket basketData={basketData} setBasketData={setBasketData} />
        <div className={st["main__menu-wrapper"]}>{layoutFoodItemsArr}</div>
      </div>
    </main>
  );
}

export default Main;
