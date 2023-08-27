import { useState } from "react";

import st from "./BasketItem.module.scss";

function BasketItem({
  imgSrc,
  label,
  weight,
  price,
  amount,
  updateTotalAmount,
  updateWholePrice,
}) {
  const ITEMS_MAX_LIMIT = 100;

  const [itemAmount, updateItemAmount] = useState(amount);

  function subtractOne() {
    if (itemAmount - 1 >= 0) {
      updateItemAmount((itemAmount) => itemAmount - 1);
      updateTotalAmount((totalAmount) => totalAmount - 1);
      updateWholePrice((wholePrice) => wholePrice - price);
    }
  }

  function addOne() {
    if (itemAmount + 1 <= ITEMS_MAX_LIMIT) {
      updateItemAmount((itemAmount) => itemAmount + 1);
      updateTotalAmount((totalAmount) => totalAmount + 1);
      updateWholePrice((wholePrice) => wholePrice + price);
    }
  }

  return (
    <div className={st["basket-item"]}>
      <img
        src={require(`../../../images/main/basket/${imgSrc}`)}
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
        <span className={st["basket-item__amount"]}>{itemAmount}</span>
        <button className={st["basket-item__amount-plus"]} onClick={addOne}>
          +
        </button>
      </div>
    </div>
  );
}

export default BasketItem;
