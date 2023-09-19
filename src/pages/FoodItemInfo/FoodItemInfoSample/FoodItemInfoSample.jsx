import st from "./FoodItemInfoSample.module.scss";

function FoodItemInfoSample() {
  return (
    <main className={st["food-item-info-sample"]}>
      <div className={st["food-item-info-sample__link-to-home"]} />
      <div className={st["food-item-info-sample__img"]} />
      <div className={st["food-item-info-sample__text-wrapper"]}>
        <div className={st["food-item-info-sample__label-label"]}></div>
        <div className={st["food-item-info-sample__label"]}></div>
        <div className={st["food-item-info-sample__price-label"]}></div>
        <div className={st["food-item-info-sample__price"]}></div>
        <div className={st["food-item-info-sample__weight-label"]}></div>
        <div className={st["food-item-info-sample__weight"]}></div>
      </div>
    </main>
  );
}

export default FoodItemInfoSample;
