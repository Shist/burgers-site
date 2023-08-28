import { imagesObj } from "./FoodImgArr";

import st from "./FoodItemCard.module.scss";

function FoodItemCard({
  uniqueCategoryId,
  uniqueFoodKey,
  price,
  label,
  weight,
  setBasketData,
}) {
  return (
    <div className={st["food-item-card"]}>
      <img
        src={imagesObj[uniqueCategoryId][uniqueFoodKey]}
        alt={label}
        className={st["food-item-card__food-img"]}
      />
      <span className={st["food-item-card__price"]}>{price}₽</span>
      <span className={st["food-item-card__label"]}>{label}</span>
      <span className={st["food-item-card__weight"]}>{weight}г</span>
      <button
        className={st["food-item-card__btn-add"]}
        onClick={() => {
          setBasketData((prevBasketState) => {
            const newBasketState = { ...prevBasketState };
            newBasketState[uniqueFoodKey]
              ? newBasketState[uniqueFoodKey].amount++
              : (newBasketState[uniqueFoodKey] = {
                  uniqueCategoryId: uniqueCategoryId,
                  uniqueFoodKey: uniqueFoodKey,
                  label: label,
                  weight: weight,
                  price: price,
                  amount: 1,
                });
            return newBasketState;
          });
        }}
      >
        Добавить
      </button>
    </div>
  );
}

export default FoodItemCard;
