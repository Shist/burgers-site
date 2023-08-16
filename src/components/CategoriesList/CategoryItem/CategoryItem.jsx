import st from "./CategoryItem.module.scss";

function CategoryItem({ imgSrc, label, isActive }) {
  return (
    <div
      className={
        isActive
          ? `${st["category-item"]} ${st["category-item_active"]}`
          : st["category-item"]
      }
    >
      <img src={imgSrc} alt={label} className={st["category-item__icon"]} />
      <span className={st["category-item__label"]}>{label}</span>
    </div>
  );
}

export default CategoryItem;
