import jsonData from "../../data/data.json";

import { useState } from "react";
import BasketItem from "./BasketItem/BasketItem";

import freeDeliveryIcon from "../../images/main/basket/delivery.svg";

import st from "./Basket.module.scss";

function Basket() {
  const itemsArr = jsonData.basketItems;

  const [totalAmount, updateTotalAmount] = useState(
    itemsArr
      .map((item) => item.amount)
      .reduce(
        (prevItemAmount, nextItemAmount) => prevItemAmount + nextItemAmount
      )
  );

  const [wholePrice, updateWholePrice] = useState(
    itemsArr
      .map((item) => item.price * item.amount)
      .reduce((prevItemPrice, nextItemPrice) => prevItemPrice + nextItemPrice)
  );

  // TODO Rewrite this code with adding modification classes for BasketItem in future ---> with states <---
  const layoutItemsArr = itemsArr.map((item, index) => {
    const { id, ...otherProps } = item;
    return (
      <BasketItem
        key={id}
        modClasses={index === itemsArr.length - 1 ? "last" : ""}
        {...otherProps}
        updateTotalAmount={updateTotalAmount}
        updateWholePrice={updateWholePrice}
      />
    );
  });

  return (
    <div className={st["basket"]}>
      <div className={st["basket__headline-amount-wrapper"]}>
        <h3 className={st["basket__headline"]}>Корзина</h3>
        <span className={st["basket__total-amount"]}>{totalAmount}</span>
      </div>
      <div className={st["basket__items-list"]}>{layoutItemsArr}</div>
      <div className={st["basket__whole-price-wrapper"]}>
        <span className={st["basket__price-label"]}>Итого</span>
        <span className={st["basket__price"]}>{wholePrice}₽</span>
      </div>
      <button className={st["basket__checkout-btn"]}>Оформить заказ</button>
      <div className={st["basket__free-delivery-label-wrapper"]}>
        <img
          src={freeDeliveryIcon}
          alt="Беслпатная доставка"
          className={st["basket__free-delivery-icon"]}
        ></img>
        <span className={st["basket__free-delivery-text"]}>
          Бесплатная доставка
        </span>
      </div>
    </div>
  );
}

export default Basket;
