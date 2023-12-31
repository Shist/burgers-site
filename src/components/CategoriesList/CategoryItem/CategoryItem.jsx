import { imagesObj } from "../CategoriesImgArr";

import st from "./CategoryItem.module.scss";

function CategoryItem({ categoryIconKey, label, isActive, setAsCurrCategory }) {
  return (
    <div
      className={
        isActive
          ? `${st["category-item"]} ${st["category-item_active"]}`
          : st["category-item"]
      }
      onClick={setAsCurrCategory}
    >
      <img
        src={imagesObj[categoryIconKey]}
        alt={label}
        className={st["category-item__icon"]}
      />
      <span className={st["category-item__label"]}>{label}</span>
    </div>
  );
}

export default CategoryItem;
