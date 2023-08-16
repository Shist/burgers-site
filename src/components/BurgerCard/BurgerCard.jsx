import st from "./BurgerCard.module.scss";

function BurgerCard({ imgSrc, price, label, weight }) {
  return (
    <div className={st["burger-card"]}>
      <img
        src={require(`../../images/main/burgers/${imgSrc}`)}
        alt={label}
        className={st["burger-card__burger-img"]}
      />
      <span className={st["burger-card__price"]}>{price}₽</span>
      <span className={st["burger-card__label"]}>{label}</span>
      <span className={st["burger-card__weight"]}>{weight}г</span>
      <button className={st["burger-card__btn-add"]}>Добавить</button>
    </div>
  );
}

export default BurgerCard;
