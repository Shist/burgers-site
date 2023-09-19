import { useState, useEffect } from "react";
import withHeaderAndFooter from "../../hoc/withHeaderAndFooter";
import useYourMealService from "../../services/YourMealService";
import CategoriesList from "../../components/CategoriesList/CategoriesList";
import Basket from "../../components/Basket/Basket";
import BasketSample from "../../components/Basket/BasketSample/BasketSample";
import FoodItemCard from "../../components/FoodItemCard/FoodItemCard";
import FoodItemCardSample from "../../components/FoodItemCard/FoodItemCardSample/FoodItemCardSample";

import st from "./Home.module.scss";

function Home({
  guestMode,
  currUserData,
  setCurrUserData,
  isDataSendingNow,
  setIsDataSendingNow,
}) {
  const [foodArr, setFoodArr] = useState(null);
  const [currCategory, setCurrCategory] = useState(
    localStorage.getItem("currentCategory")
      ? localStorage.getItem("currentCategory")
      : "burgers"
  );

  const { loading, serverError, getAllFoodData } = useYourMealService();

  useEffect(() => {
    getAllFoodData().then((foodArrData) => {
      setFoodArr(foodArrData);
    });
  }, []);

  const categoryIdInArr = foodArr
    ? foodArr.map((item) => item.uniqueCategoryId).indexOf(currCategory)
    : null;

  const layoutFoodItemsArr = foodArr
    ? foodArr[categoryIdInArr].items.map((item) => {
        const { uniqueFoodKey, ...otherProps } = item;
        return (
          <FoodItemCard
            key={uniqueFoodKey}
            uniqueCategoryId={currCategory}
            uniqueFoodKey={uniqueFoodKey}
            {...otherProps}
            currUserData={currUserData}
            setCurrUserData={setCurrUserData}
            guestMode={guestMode}
            isDataSendingNow={isDataSendingNow}
            setIsDataSendingNow={setIsDataSendingNow}
          />
        );
      })
    : null;

  return (
    <main className={st.home}>
      {serverError ? (
        <h2
          className={st["home__error-headline"]}
        >{`Ошибка при попытке получения данных о товарах: ${serverError}`}</h2>
      ) : null}
      <CategoriesList
        extraClasses={st["home__categories-list"]}
        foodArr={foodArr}
        loading={loading}
        currCategory={currCategory}
        setCurrCategory={setCurrCategory}
      />
      {loading ? (
        <div className={st["home__food-headline-sample"]}></div>
      ) : (
        <h2 className={st["home__food-headline"]}>
          {foodArr ? foodArr[categoryIdInArr].label : null}
        </h2>
      )}
      <div className={st["home__basket-menu-wrapper"]}>
        {loading ? (
          <BasketSample />
        ) : (
          <Basket
            currUserData={currUserData}
            setCurrUserData={setCurrUserData}
            guestMode={guestMode}
            isDataSendingNow={isDataSendingNow}
            setIsDataSendingNow={setIsDataSendingNow}
          />
        )}
        <div className={st["home__menu-wrapper"]}>
          {loading ? (
            <>
              <FoodItemCardSample />
              <FoodItemCardSample />
              <FoodItemCardSample />
              <FoodItemCardSample />
              <FoodItemCardSample />
              <FoodItemCardSample />
            </>
          ) : (
            layoutFoodItemsArr
          )}
        </div>
      </div>
    </main>
  );
}

export default withHeaderAndFooter(Home);
