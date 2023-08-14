import st from "./BasketItem.module.scss";

function BasketItem({ imgSrc, label, weight, price, amount }) {
  return (
    <div className={st["basket-item"]}>
      <img src={imgSrc} alt={label} className={st["basket-item__img"]} />
      <div className={st["basket-item__label-weight-price-wrapper"]}>
        <span className={st["basket-item__label"]}>{label}</span>
        <span className={st["basket-item__weight"]}>{`${weight}г`}</span>
        <span className={st["basket-item__price"]}>{`${price}₽`}</span>
      </div>
      <div className={st["basket-item__amount-wrapper"]}>
        <button className={st["basket-item__amount-minus"]}>-</button>
        <span className={st["basket-item__amount"]}>{amount}</span>
        <button className={st["basket-item__amount-plus"]}>+</button>
      </div>
    </div>
  );
}

export default BasketItem;
