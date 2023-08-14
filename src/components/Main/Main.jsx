import st from "./Main.module.scss";
import CategoriesList from "./CategoriesList/CategoriesList";
import Basket from "./Basket/Basket";
import BurgerCard from "./BurgerCard/BurgerCard";

function Main() {
  const basketItemsArr = [
    {
      id: 1,
      imgSrc: require("../../images/main/basket/cheese-burger.png"),
      label: "Супер сырный",
      weight: 512,
      price: 550,
      amount: 1,
    },
    {
      id: 2,
      imgSrc: require("../../images/main/basket/potato.png"),
      label: "Картошка фри",
      weight: 180,
      price: 245,
      amount: 2,
    },
    {
      id: 3,
      imgSrc: require("../../images/main/basket/hot-dog.png"),
      label: "Жгучий хот-дог",
      weight: 245,
      price: 239,
      amount: 1,
    },
  ];

  const burgerItemsArr = [
    {
      id: 1,
      imgSrc: require("../../images/main/burgers/meat-bomb.png"),
      price: 689,
      label: "Мясная бомба",
      weight: 520,
    },
    {
      id: 2,
      imgSrc: require("../../images/main/burgers/super-cheesy.png"),
      price: 550,
      label: "Супер сырный",
      weight: 512,
    },
    {
      id: 3,
      imgSrc: require("../../images/main/burgers/satisfying.png"),
      price: 639,
      label: "Сытный",
      weight: 580,
    },
    {
      id: 4,
      imgSrc: require("../../images/main/burgers/heavy-blow.png"),
      price: 480,
      label: "Тяжелый удар",
      weight: 470,
    },
    {
      id: 5,
      imgSrc: require("../../images/main/burgers/timeless-classic.png"),
      price: 450,
      label: "Вечная классика",
      weight: 450,
    },
    {
      id: 6,
      imgSrc: require("../../images/main/burgers/italian.png"),
      price: 560,
      label: "Итальянский",
      weight: 510,
    },
  ];

  const layoutBurgerItemsArr = burgerItemsArr.map((item) => {
    const { id, ...otherProps } = item;
    return <BurgerCard key={id} {...otherProps} />;
  });

  return (
    <main className={st.main}>
      <CategoriesList extraClasses={st["main__categories-list"]} />
      <h2 className={st["main__food-headline"]}>Бургеры</h2>
      <div className={st["main__basket-menu-wrapper"]}>
        <Basket itemsArr={basketItemsArr} />
        <div className={st["main__menu-wrapper"]}>{layoutBurgerItemsArr}</div>
      </div>
    </main>
  );
}

export default Main;
