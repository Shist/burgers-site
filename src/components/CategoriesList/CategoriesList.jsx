import CategoryItem from "./CategoryItem/CategoryItem";
import CategoryItemSample from "./CategoryItem/CategoryItemSample/CategoryItemSample";

import st from "./CategoriesList.module.scss";

function CategoriesList({
  extraClasses,
  foodArr,
  loading,
  currCategory,
  setCurrCategory,
}) {
  let classesStr = st["categories-list"];
  if (extraClasses) classesStr += ` ${extraClasses}`;

  const layoutCategoriesArr = foodArr
    ? foodArr.map((item) => {
        const { uniqueCategoryId, ...otherProps } = item;
        return (
          <CategoryItem
            key={uniqueCategoryId}
            {...otherProps}
            isActive={currCategory === uniqueCategoryId ? true : false}
            setAsCurrCategory={() => {
              setCurrCategory(uniqueCategoryId);
              localStorage.setItem("currentCategory", uniqueCategoryId);
            }}
          />
        );
      })
    : null;

  return (
    <div className={classesStr}>
      {loading ? (
        <>
          <CategoryItemSample />
          <CategoryItemSample />
          <CategoryItemSample />
          <CategoryItemSample />
          <CategoryItemSample />
          <CategoryItemSample />
          <CategoryItemSample />
          <CategoryItemSample />
          <CategoryItemSample />
        </>
      ) : (
        layoutCategoriesArr
      )}
    </div>
  );
}

export default CategoriesList;
