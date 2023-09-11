import st from "./FoodItemCardSample.module.scss";

function FoodItemCardSample() {
  return (
    <div className={st["food-item-card-sample"]}>
      <div className={st["food-item-card-sample__food-img"]} />
      <div className={st["food-item-card-sample__price"]}></div>
      <div className={st["food-item-card-sample__label"]}></div>
      <div className={st["food-item-card-sample__weight"]}></div>
      <div className={st["food-item-card-sample__btn-add"]}></div>
    </div>
  );
}

export default FoodItemCardSample;
