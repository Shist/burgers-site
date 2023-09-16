import useYourMealService from "../../services/YourMealService";

import { imagesObj } from "./FoodImgArr";

import st from "./FoodItemCard.module.scss";

function FoodItemCard({
  uniqueCategoryId,
  uniqueFoodKey,
  price,
  label,
  weight,
  currUserData,
  setCurrUserData,
  guestMode,
  setIsDataSendingNow,
}) {
  const { serverError, clearServerError, updateUserBasketOnServer } =
    useYourMealService();

  const addFoodItemToBasket = () => {
    const newUserDataState = guestMode
      ? { basket: { ...currUserData.basket } }
      : {
          name: currUserData.name,
          password: currUserData.password,
          basket: { ...currUserData.basket },
          id: currUserData.id,
        };
    newUserDataState.basket[uniqueFoodKey]
      ? newUserDataState.basket[uniqueFoodKey].amount++
      : (newUserDataState.basket[uniqueFoodKey] = {
          uniqueCategoryId: uniqueCategoryId,
          uniqueFoodKey: uniqueFoodKey,
          label: label,
          weight: weight,
          price: price,
          amount: 1,
        });
    if (guestMode) {
      setCurrUserData(() => newUserDataState);
    } else {
      clearServerError();
      setIsDataSendingNow(true);
      updateUserBasketOnServer(newUserDataState.id, newUserDataState)
        .then(() => {
          setCurrUserData(() => newUserDataState);
        })
        .finally(() => {
          setIsDataSendingNow(false);
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
