import st from "./Basket.module.scss";
import BasketItem from "./BasketItem/BasketItem";
import freeDeliveryIcon from "../../../images/main/basket/delivery.svg";

function Basket({ modClasses, itemsArr }) {
  let classesStr = st["basket"];
  if (modClasses) {
    modClasses.split(" ").forEach((modClass) => {
      classesStr += " ";
      classesStr += st[`basket_${modClass}`];
    });
  }

  const layoutItemsArr = itemsArr.map((item, index) => {
    const { id, ...otherProps } = item;
    return (
      <BasketItem
        key={id}
        modClasses={index === itemsArr.length - 1 ? "last" : ""}
        {...otherProps}
      />
    );
  });

  const totalAmount = itemsArr
    .map((item) => item.amount)
    .reduce(
      (prevItemAmount, nextItemAmount) => prevItemAmount + nextItemAmount
    );

  const wholePrice = itemsArr
    .map((item) => item.price * item.amount)
    .reduce((prevItemPrice, nextItemPrice) => prevItemPrice + nextItemPrice);

  return (
    <div className={classesStr}>
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
