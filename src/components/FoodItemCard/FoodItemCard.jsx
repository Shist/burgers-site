import st from "./FoodItemCard.module.scss";

function FoodItemCard({ labelId, imgSrc, price, label, weight }) {
  return (
    <div className={st["food-item-card"]}>
      <img
        src={require(`../../images/main/${labelId}/${imgSrc}`)}
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
