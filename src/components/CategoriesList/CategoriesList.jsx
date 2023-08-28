import jsonData from "../../data/data.json";

import CategoryItem from "./CategoryItem/CategoryItem";

import st from "./CategoriesList.module.scss";

function CategoriesList({ extraClasses, currCategory, setCurrCategory }) {
  let classesStr = st["categories-list"];
  if (extraClasses) classesStr += ` ${extraClasses}`;

  const layoutCategoriesArr = jsonData.categoryItems.map((item) => {
    const { uniqueCategoryId, ...otherProps } = item;
    return (
      <CategoryItem
        key={uniqueCategoryId}
        {...otherProps}
        isActive={currCategory === uniqueCategoryId ? true : false}
        setAsCurrCategory={() => {
          setCurrCategory(uniqueCategoryId);
          localStorage.setItem("currCategory", uniqueCategoryId);
        }}
      />
    );
  });

  return <div className={classesStr}>{layoutCategoriesArr}</div>;
}

export default CategoriesList;
