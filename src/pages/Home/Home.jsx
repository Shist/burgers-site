import { useState, useEffect } from "react";
import useYourMealService from "../../services/YourMealService";
import Header from "../../components/Header/Header";
import CategoriesList from "../../components/CategoriesList/CategoriesList";
import Basket from "../../components/Basket/Basket";
import BasketSample from "../../components/Basket/BasketSample/BasketSample";
import FoodItemCard from "../../components/FoodItemCard/FoodItemCard";
import FoodItemCardSample from "../../components/FoodItemCard/FoodItemCardSample/FoodItemCardSample";
import Footer from "../../components/Footer/Footer";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import FullPageSpinner from "../../components/FullPageSpinner/FullPageSpinner";

import st from "./Home.module.scss";

function Home({
  guestMode,
  currUserData,
  setCurrUserData,
  deleteUserFromLocal,
}) {
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [foodArr, setFoodArr] = useState(null);
  const [isDataSendingNow, setIsDataSendingNow] = useState(false);
  const [currCategory, setCurrCategory] = useState(
    localStorage.getItem("currentCategory")
      ? localStorage.getItem("currentCategory")
      : "burgers"
  );

  const { loading, serverError, getUserById, getAllFoodData } =
    useYourMealService();

  useEffect(() => {
    if (!guestMode && !currUserData.name) {
      getUserById(localStorage.getItem("currentUserId")).then((userData) => {
        setCurrUserData(userData);
      });
    }
    getAllFoodData().then((foodArrData) => {
      setFoodArr(foodArrData);
    });
  }, []);

  const TABLET_WIDTH = 768;
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > TABLET_WIDTH) {
        setBurgerMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
            setIsDataSendingNow={setIsDataSendingNow}
          />
        );
      })
    : null;

  return (
    <>
      <Header
        burgerMenu={burgerMenu}
        setBurgerMenu={setBurgerMenu}
        guestMode={guestMode}
        deleteUserFromLocal={deleteUserFromLocal}
        currUserData={currUserData}
        loading={loading}
      />
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
      <Footer />
      <BurgerMenu
        burgerMenu={burgerMenu}
        setBurgerMenu={setBurgerMenu}
        guestMode={guestMode}
        deleteUserFromLocal={deleteUserFromLocal}
      />
      <FullPageSpinner dataIsSending={isDataSendingNow} />
    </>
  );
}

export default Home;
