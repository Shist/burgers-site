import st from "./CategoriesList.module.scss";
import CategoryItem from "./CategoryItem/CategoryItem";
import burgersIcon from "../../images/main/categories/burger.svg";
import snacksIcon from "../../images/main/categories/snacks.svg";
import hotDogsIcon from "../../images/main/categories/hot-dogs.svg";
import comboIcon from "../../images/main/categories/combo.svg";
import shawarmaIcon from "../../images/main/categories/shawarma.svg";
import pizzaIcon from "../../images/main/categories/pizza.svg";
import wokIcon from "../../images/main/categories/wok.svg";
import dessertIcon from "../../images/main/categories/dessert.svg";
import saucesIcon from "../../images/main/categories/sauces.svg";

function CategoriesList({ extraClasses }) {
  let classesStr = st["categories-list"];
  if (extraClasses) classesStr += ` ${extraClasses}`;

  return (
    <div className={classesStr}>
      <CategoryItem imgSrc={burgersIcon} label="Бургеры" isActive={true} />
      <CategoryItem imgSrc={snacksIcon} label="Закуски" isActive={false} />
      <CategoryItem imgSrc={hotDogsIcon} label="Хот-доги" isActive={false} />
      <CategoryItem imgSrc={comboIcon} label="Комбо" isActive={false} />
      <CategoryItem imgSrc={shawarmaIcon} label="Шаурма" isActive={false} />
      <CategoryItem imgSrc={pizzaIcon} label="Пицца" isActive={false} />
      <CategoryItem imgSrc={wokIcon} label="Вок" isActive={false} />
      <CategoryItem imgSrc={dessertIcon} label="Дессерты" isActive={false} />
      <CategoryItem imgSrc={saucesIcon} label="Соусы" isActive={false} />
    </div>
  );
}

export default CategoriesList;
