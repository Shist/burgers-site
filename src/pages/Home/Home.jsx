import jsonData from "../../data/data.json";

import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import CategoriesList from "../../components/CategoriesList/CategoriesList";
import Basket from "../../components/Basket/Basket";
import FoodItemCard from "../../components/FoodItemCard/FoodItemCard";
import Footer from "../../components/Footer/Footer";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";

import st from "./Home.module.scss";

function Home({ guestMode, deleteUserFromLocalStorage }) {
  const [burgerMenu, setBurgerMenu] = useState(false);

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
    <>
      <Header
        burgerMenu={burgerMenu}
        setBurgerMenu={setBurgerMenu}
        guestMode={guestMode}
        deleteUserFromLocalStorage={deleteUserFromLocalStorage}
      />
      <main className={st.home}>
        <CategoriesList
          extraClasses={st["home__categories-list"]}
          currCategory={currCategory}
          setCurrCategory={setCurrCategory}
        />
        <h2 className={st["home__food-headline"]}>
          {jsonData.categoryItems[categoryIdInArr].label}
        </h2>
        {/* <div className={st["home__food-headline-sample"]}></div> */}
        <div className={st["home__basket-menu-wrapper"]}>
          <Basket basketData={basketData} setBasketData={setBasketData} />
          <div className={st["home__menu-wrapper"]}>{layoutFoodItemsArr}</div>
        </div>
      </main>
      <Footer />
      <BurgerMenu
        burgerMenu={burgerMenu}
        setBurgerMenu={setBurgerMenu}
        guestMode={guestMode}
        deleteUserFromLocalStorage={deleteUserFromLocalStorage}
      />
    </>
  );
}

export default Home;
