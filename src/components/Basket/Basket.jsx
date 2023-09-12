import useYourMealService from "../../services/YourMealService";
import BasketItem from "./BasketItem/BasketItem";

import trashCanImg from "../../images/main/basket/trash-can.png";
import freeDeliveryIcon from "../../images/main/basket/delivery.svg";

import st from "./Basket.module.scss";

function Basket({ basketData, setBasketData, guestMode, setIsDataSendingNow }) {
  const { serverError, clearServerError, updateUserBasketOnServer } =
    useYourMealService();

  const itemsArr = Object.entries(basketData).map(
    (basketItemKeyValue) => basketItemKeyValue[1]
  );

  const totalAmount = itemsArr.length
    ? itemsArr
        .map((item) => item.amount)
        .reduce(
          (prevItemAmount, nextItemAmount) => prevItemAmount + nextItemAmount
        )
    : 0;

  const wholePrice = itemsArr.length
    ? itemsArr
        .map((item) => item.price * item.amount)
        .reduce((prevItemPrice, nextItemPrice) => prevItemPrice + nextItemPrice)
    : 0;

  const layoutItemsArr = itemsArr.map((item) => {
    const { uniqueFoodKey, ...otherProps } = item;
    return (
      <BasketItem
        key={uniqueFoodKey}
        uniqueFoodKey={uniqueFoodKey}
        {...otherProps}
        basketData={basketData}
        setBasketData={setBasketData}
        guestMode={guestMode}
        setIsDataSendingNow={setIsDataSendingNow}
        clearServerError={clearServerError}
        updateUserBasketOnServer={updateUserBasketOnServer}
      />
    );
  });

  const clearAllBtnClicked = () => {
    if (guestMode) {
      setBasketData({});
    } else {
      clearServerError();
      setIsDataSendingNow(true);
      updateUserBasketOnServer(localStorage.getItem("currentUserId"), {
        name: localStorage.getItem("currentUser"),
        password: localStorage.getItem("currentUserPassword"),
        basket: {},
        id: localStorage.getItem("currentUserId"),
      })
        .then(() => {
          setBasketData({});
        })
        .finally(() => {
          setIsDataSendingNow(false);
        });
    }
  };

  return (
    <div className={st["basket"]}>
      {serverError ? (
        <h3
          className={st["basket__error-msg"]}
        >{`Ошибка при попытке обновления корзины: ${serverError}`}</h3>
      ) : null}
      <div className={st["basket__headline-amount-wrapper"]}>
        <h3 className={st["basket__headline"]}>Корзина</h3>
        <span className={st["basket__total-amount"]}>{totalAmount}</span>
      </div>
      {layoutItemsArr.length ? (
        <button
          className={st["basket__clear-all-btn"]}
          onClick={clearAllBtnClicked}
        >
          <img
            src={trashCanImg}
            alt="Очистить корзину"
            className={st["basket__clear-all-btn-img"]}
          />
          <span className={st["basket__clear-all-text"]}>Очистить корзину</span>
        </button>
      ) : null}
      <div className={st["basket__items-list"]}>
        {layoutItemsArr.length ? (
          layoutItemsArr
        ) : (
          <span className={st["basket__empty-basket-label"]}>
            На данный момент ваша корзина пуста, добавьте в неё что-нибудь!
          </span>
        )}
      </div>
      <div className={st["basket__whole-price-wrapper"]}>
        <span className={st["basket__price-label"]}>Итого</span>
        <span className={st["basket__price"]}>{wholePrice}₽</span>
      </div>
      <button
        className={st["basket__checkout-btn"]}
        disabled={!layoutItemsArr.length}
      >
        Оформить заказ
      </button>
      <div className={st["basket__free-delivery-label-wrapper"]}>
        <img
          src={freeDeliveryIcon}
          alt="Беслпатная доставка"
          className={st["basket__free-delivery-icon"]}
        ></img>
        <span className={st["basket__free-delivery-text"]}>
          Бесплатная доставка
        </span>
      </div>
    </div>
  );
}

export default Basket;
