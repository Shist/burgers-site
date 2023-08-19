import jsonData from "../../data/data.json";

import CategoryItem from "./CategoryItem/CategoryItem";

import st from "./CategoriesList.module.scss";

function CategoriesList({ extraClasses }) {
  let classesStr = st["categories-list"];
  if (extraClasses) classesStr += ` ${extraClasses}`;

  const layoutCategoriesArr = jsonData.categoryItems.map((item) => {
    const { id, ...otherProps } = item;
    return <CategoryItem key={id} {...otherProps} />;
  });

  return <div className={classesStr}>{layoutCategoriesArr}</div>;
}

export default CategoriesList;
