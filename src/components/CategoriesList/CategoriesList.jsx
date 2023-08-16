import st from "./CategoriesList.module.scss";
import CategoryItem from "./CategoryItem/CategoryItem";

function CategoriesList({ extraClasses, categoriesArr }) {
  let classesStr = st["categories-list"];
  if (extraClasses) classesStr += ` ${extraClasses}`;

  const layoutCategoriesArr = categoriesArr.map((item) => {
    const { id, ...otherProps } = item;
    return <CategoryItem key={id} {...otherProps} />;
  });

  return <div className={classesStr}>{layoutCategoriesArr}</div>;
}

export default CategoriesList;
