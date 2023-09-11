import BasketItemSample from "../BasketItem/BasketItemSample/BasketItemSample";

import st from "./BasketSample.module.scss";

function BasketSample() {
  return (
    <div className={st["basket-sample"]}>
      <div className={st["basket-sample__headline-amount-wrapper"]}>
        <div className={st["basket-sample__headline"]}></div>
        <div className={st["basket-sample__total-amount"]}></div>
      </div>
      <div className={st["basket-sample__items-list"]}>
        <BasketItemSample />
        <BasketItemSample />
        <BasketItemSample />
      </div>
      <div className={st["basket-sample__whole-price-wrapper"]}>
        <div className={st["basket-sample__price-label"]}></div>
        <div className={st["basket-sample__price"]}></div>
      </div>
      <div className={st["basket-sample__checkout-btn"]}></div>
      <div className={st["basket-sample__free-delivery-label-wrapper"]}>
        <div className={st["basket-sample__free-delivery-icon"]}></div>
        <div className={st["basket-sample__free-delivery-text"]}></div>
      </div>
    </div>
  );
}

export default BasketSample;
