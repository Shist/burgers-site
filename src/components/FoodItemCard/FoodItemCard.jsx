import { imagesObj } from "./FoodImgArr";

import st from "./FoodItemCard.module.scss";

function FoodItemCard({ labelId, imgKey, price, label, weight }) {
  return (
    <div className={st["food-item-card"]}>
      <img
        src={imagesObj[labelId][imgKey]}
        alt={label}
        className={st["food-item-card__food-img"]}
      />
      <span className={st["food-item-card__price"]}>{price}₽</span>
      <span className={st["food-item-card__label"]}>{label}</span>
      <span className={st["food-item-card__weight"]}>{weight}г</span>
      <button className={st["food-item-card__btn-add"]}>Добавить</button>
    </div>
  );
}

export default FoodItemCard;
