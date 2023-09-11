import st from "./CategoryItemSample.module.scss";

function CategoryItemSample() {
  return (
    <div className={st["category-item-sample"]}>
      <div className={st["category-item-sample__icon"]} />
      <div className={st["category-item-sample__label"]}></div>
    </div>
  );
}

export default CategoryItemSample;
