import st from "./BasketItem.module.scss";

function BasketItem({ modClasses, imgSrc, label, weight, price, amount }) {
  let classesStr = st["basket-item"];
  if (modClasses) {
    modClasses.split(" ").forEach((modClass) => {
      classesStr += " ";
      classesStr += st[`basket-item_${modClass}`];
    });
  }

  return (
    <div className={classesStr}>
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
