import { imagesObj } from "../../FoodItemCard/FoodImgArr";

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
}) {
  const ITEMS_MAX_LIMIT = 100;

  function subtractOne() {
    if (amount - 1 >= 0) {
      const newBasketState = { ...basketData };
      newBasketState[uniqueFoodKey].amount--;
      if (!newBasketState[uniqueFoodKey].amount) {
        delete newBasketState[uniqueFoodKey];
      }
      setBasketData(() => newBasketState);
    }
  }

  function addOne() {
    if (amount + 1 <= ITEMS_MAX_LIMIT) {
      const newBasketState = { ...basketData };
      newBasketState[uniqueFoodKey].amount++;
      setBasketData(() => newBasketState);
    }
  }

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
  );
}

export default BasketItem;
