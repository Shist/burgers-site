import st from "./Main.module.scss";
import CategoriesList from "./CategoriesList/CategoriesList";
import Basket from "./Basket/Basket";

function Main() {
  const itemsArr = [
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

  return (
    <main className={st.main}>
      <CategoriesList extraClasses={st["main__categories-list"]} />
      <h2 className={st["main__food-headline"]}>Бургеры</h2>
      <div className="main__basket-menu-wrapper">
        <Basket itemsArr={itemsArr} />
        <div className="main__menu-wrapper"></div>
      </div>
    </main>
  );
}

export default Main;
