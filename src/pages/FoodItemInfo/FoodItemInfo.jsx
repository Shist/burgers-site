import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import withHeaderAndFooter from "../../hoc/withHeaderAndFooter";
import useYourMealService from "../../services/YourMealService";

import { imagesObj } from "../../components/FoodItemCard/FoodImgArr";

import st from "./FoodItemInfo.module.scss";

const FoodItemInfo = () => {
  const { uniqueCategoryId, uniqueFoodKey } = useParams();
  const [foodItem, setFoodItem] = useState(null);

  const { loading, serverError, getFoodCategoryById } = useYourMealService();

  useEffect(() => {
    getFoodCategoryById(uniqueCategoryId).then((categoryData) => {
      setFoodItem(
        categoryData.items.find(
          (foodItem) => foodItem.uniqueFoodKey === uniqueFoodKey
        )
      );
    });
  }, []);

  return (
    <main className={st["food-item-info"]}>
      <Link to="/" className={st["food-item-info__link-to-home"]}>
        На главную
      </Link>
      <img
        src={imagesObj[uniqueCategoryId][uniqueFoodKey]}
        alt={foodItem?.label}
        className={st["food-item-info__img"]}
      />
      <span className={st["food-item-info__price"]}>{foodItem?.price}₽</span>
      <span className={st["food-item-info__label"]}>{foodItem?.label}</span>
      <span className={st["food-item-info__weight"]}>{foodItem?.weight}г</span>
    </main>
  );
};

export default withHeaderAndFooter(FoodItemInfo);
