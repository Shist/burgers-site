import { imagesObj } from "../../FoodItemCard/FoodImgArr";
import trashCanImg from "../../../images/main/basket/trash-can.png";

import st from "./BasketItem.module.scss";

function BasketItem({
  uniqueCategoryId,
  uniqueFoodKey,
  label,
  weight,
  price,
  amount,
  currUserData,
  setCurrUserData,
  guestMode,
  setIsDataSendingNow,
  clearServerError,
  updateUserBasketOnServer,
}) {
  const ITEMS_MAX_LIMIT = 100;

  const updateCurrUserData = (newUserDataState) => {
    if (guestMode) {
      setCurrUserData(() => newUserDataState);
    } else {
      clearServerError();
      setIsDataSendingNow(true);
      updateUserBasketOnServer(
        localStorage.getItem("currentUserId"),
        newUserDataState
      )
        .then(() => {
          setCurrUserData(() => newUserDataState);
        })
        .finally(() => {
          setIsDataSendingNow(false);
        });
    }
  };

  const clearBtnClicked = () => {
    const newUserDataState = guestMode
      ? { basket: { ...currUserData.basket } }
      : {
          name: currUserData.name,
          password: currUserData.password,
          basket: { ...currUserData.basket },
          id: currUserData.id,
        };
    delete newUserDataState.basket[uniqueFoodKey];
    updateCurrUserData(newUserDataState);
  };

  const subtractOne = () => {
    if (amount - 1 >= 0) {
      const newUserDataState = guestMode
        ? { basket: { ...currUserData.basket } }
        : {
            name: currUserData.name,
            password: currUserData.password,
            basket: { ...currUserData.basket },
            id: currUserData.id,
          };
      newUserDataState.basket[uniqueFoodKey].amount--;
      if (!newUserDataState.basket[uniqueFoodKey].amount) {
        delete newUserDataState.basket[uniqueFoodKey];
      }
      updateCurrUserData(newUserDataState);
    }
  };

  const addOne = () => {
    if (amount + 1 <= ITEMS_MAX_LIMIT) {
      const newUserDataState = guestMode
        ? { basket: { ...currUserData.basket } }
        : {
            name: currUserData.name,
            password: currUserData.password,
            basket: { ...currUserData.basket },
            id: currUserData.id,
          };
      newUserDataState.basket[uniqueFoodKey].amount++;
      updateCurrUserData(newUserDataState);
    }
  };

  return (
    <div className={st["basket-item"]}>
      <img
        src={imagesObj[uniqueCategoryId][uniqueFoodKey]}
        alt={label}
        className={st["basket-item__img"]}
      />
      <div className={st["basket-item__label-weight-price-wrapper"]}>
        <span className={st["basket-item__label"]}>{label}</span>
        <span className={st["basket-item__weight"]}>{`${weight}г`}</span>
        <span className={st["basket-item__price"]}>{`${price}₽`}</span>
      </div>
      <div className={st["basket-item__del-btn-and-amount-wrapper"]}>
        <button
          className={st["basket-item__clear-all-btn"]}
          onClick={clearBtnClicked}
        >
          <img
            src={trashCanImg}
            alt="Удалить весь товар этого типа из корзины"
            className={st["basket-item__clear-all-img"]}
          />
        </button>
        <div className={st["basket-item__amount-wrapper"]}>
          <button
            className={st["basket-item__amount-minus"]}
            onClick={subtractOne}
          >
            -
          </button>
          <span className={st["basket-item__amount"]}>{amount}</span>
          <button className={st["basket-item__amount-plus"]} onClick={addOne}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasketItem;
