import st from "./BasketItemSample.module.scss";

function BasketItemSample() {
  return (
    <div className={st["basket-item-sample"]}>
      <div className={st["basket-item-sample__img"]}></div>
      <div className={st["basket-item-sample__label-weight-price-wrapper"]}>
        <div className={st["basket-item-sample__label"]}></div>
        <div className={st["basket-item-sample__weight"]}></div>
        <div className={st["basket-item-sample__price"]}></div>
      </div>
    </div>
  );
}

export default BasketItemSample;
