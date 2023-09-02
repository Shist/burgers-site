import jsonData from "../../data/data.json";

import { useState } from "react";
import CategoriesList from "../../components/CategoriesList/CategoriesList";
import Basket from "../../components/Basket/Basket";
import FoodItemCard from "../../components/FoodItemCard/FoodItemCard";

import st from "./Home.module.scss";

function Home() {
  const [currCategory, setCurrCategory] = useState(
    localStorage.getItem("currCategory")
      ? localStorage.getItem("currCategory")
      : "burgers"
  );

  const [basketData, setBasketData] = useState({});

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
          basketData={basketData}
          setBasketData={setBasketData}
        />
      );
    }
  );

  return (
    <div className={st.home}>
      <CategoriesList
        extraClasses={st["home__categories-list"]}
        currCategory={currCategory}
        setCurrCategory={setCurrCategory}
      />
      <h2 className={st["home__food-headline"]}>
        {jsonData.categoryItems[categoryIdInArr].label}
      </h2>
      <div className={st["home__basket-menu-wrapper"]}>
        <Basket basketData={basketData} setBasketData={setBasketData} />
        <div className={st["home__menu-wrapper"]}>{layoutFoodItemsArr}</div>
      </div>
    </div>
  );
}

export default Home;
