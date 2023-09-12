import useYourMealService from "../../services/YourMealService";

import { imagesObj } from "./FoodImgArr";

import st from "./FoodItemCard.module.scss";

function FoodItemCard({
  uniqueCategoryId,
  uniqueFoodKey,
  price,
  label,
  weight,
  basketData,
  setBasketData,
  guestMode,
  setSendingData,
}) {
  const { serverError, clearServerError, updateUserBasket } =
    useYourMealService();

  const addFoodItemToBasket = () => {
    const newBasketState = { ...basketData };
    newBasketState[uniqueFoodKey]
      ? newBasketState[uniqueFoodKey].amount++
      : (newBasketState[uniqueFoodKey] = {
          uniqueCategoryId: uniqueCategoryId,
          uniqueFoodKey: uniqueFoodKey,
          label: label,
          weight: weight,
          price: price,
          amount: 1,
        });
    if (guestMode) {
      setBasketData(() => newBasketState);
    } else {
      clearServerError();
      setSendingData(true);
      updateUserBasket(localStorage.getItem("currentUserId"), {
        name: localStorage.getItem("currentUser"),
        password: localStorage.getItem("currentUserPassword"),
        basket: newBasketState,
        id: localStorage.getItem("currentUserId"),
      })
        .then(() => {
          setBasketData(() => newBasketState);
        })
        .finally(() => {
          setSendingData(false);
        });
    }
  };

  return (
    <div className={st["food-item-card"]}>
      <img
        src={imagesObj[uniqueCategoryId][uniqueFoodKey]}
        alt={label}
        className={st["food-item-card__food-img"]}
      />
      <span className={st["food-item-card__price"]}>{price}₽</span>
      <span className={st["food-item-card__label"]}>{label}</span>
      <span className={st["food-item-card__weight"]}>{weight}г</span>
      <button
        className={st["food-item-card__btn-add"]}
        onClick={addFoodItemToBasket}
      >
        Добавить
      </button>
      {serverError ? (
        <span
          className={st["food-item-card__error-msg"]}
        >{`Ошибка при попытке добавления товара: ${serverError}`}</span>
      ) : null}
    </div>
  );
}

export default FoodItemCard;
