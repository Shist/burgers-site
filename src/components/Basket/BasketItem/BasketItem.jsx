import { imagesObj } from "../../FoodItemCard/FoodImgArr";
import trashCanImg from "../../../images/main/basket/trash-can.png";

import st from "./BasketItem.module.scss";

function BasketItem({
  uniqueCategoryId,
  uniqueFoodKey,
  label,
  weight,
  price,
  amount,
  basketData,
  setBasketData,
  guestMode,
  setSendingData,
  clearServerError,
  updateUserBasket,
}) {
  const ITEMS_MAX_LIMIT = 100;

  const updateBasketData = (newBasketState) => {
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

  const clearBtnClicked = () => {
    const newBasketState = { ...basketData };
    delete newBasketState[uniqueFoodKey];
    updateBasketData(newBasketState);
  };

  const subtractOne = () => {
    if (amount - 1 >= 0) {
      const newBasketState = { ...basketData };
      newBasketState[uniqueFoodKey].amount--;
      if (!newBasketState[uniqueFoodKey].amount) {
        delete newBasketState[uniqueFoodKey];
      }
      updateBasketData(newBasketState);
    }
  };

  const addOne = () => {
    if (amount + 1 <= ITEMS_MAX_LIMIT) {
      const newBasketState = { ...basketData };
      newBasketState[uniqueFoodKey].amount++;
      updateBasketData(newBasketState);
    }
  };

  return (
    <div className={st["basket-item"]}>
      <img
        src={imagesObj[uniqueCategoryId][uniqueFoodKey]}
        alt={label}
        className={st["basket-item__img"]}
      />
      <div className={st["basket-item__label-weight-price-wrapper"]}>
        <span className={st["basket-item__label"]}>{label}</span>
        <span className={st["basket-item__weight"]}>{`${weight}г`}</span>
        <span className={st["basket-item__price"]}>{`${price}₽`}</span>
      </div>
      <div className={st["basket-item__del-btn-and-amount-wrapper"]}>
        <button
          className={st["basket-item__clear-all-btn"]}
          onClick={clearBtnClicked}
        >
          <img
            src={trashCanImg}
            alt="Удалить весь товар этого типа из корзины"
            className={st["basket-item__clear-all-img"]}
          />
        </button>
        <div className={st["basket-item__amount-wrapper"]}>
          <button
            className={st["basket-item__amount-minus"]}
            onClick={subtractOne}
          >
            -
          </button>
          <span className={st["basket-item__amount"]}>{amount}</span>
          <button className={st["basket-item__amount-plus"]} onClick={addOne}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasketItem;
