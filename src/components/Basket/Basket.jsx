import BasketItem from "./BasketItem/BasketItem";

import freeDeliveryIcon from "../../images/main/basket/delivery.svg";

import st from "./Basket.module.scss";

function Basket({ basketData, setBasketData }) {
  const itemsArr = Object.entries(basketData).map(
    (basketItemKeyValue) => basketItemKeyValue[1]
  );

  const totalAmount = itemsArr.length
    ? itemsArr
        .map((item) => item.amount)
        .reduce(
          (prevItemAmount, nextItemAmount) => prevItemAmount + nextItemAmount
        )
    : 0;

  const wholePrice = itemsArr.length
    ? itemsArr
        .map((item) => item.price * item.amount)
        .reduce((prevItemPrice, nextItemPrice) => prevItemPrice + nextItemPrice)
    : 0;

  const layoutItemsArr = itemsArr.map((item) => {
    const { uniqueFoodKey, ...otherProps } = item;
    return (
      <BasketItem
        key={uniqueFoodKey}
        uniqueFoodKey={uniqueFoodKey}
        {...otherProps}
        basketData={basketData}
        setBasketData={setBasketData}
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
