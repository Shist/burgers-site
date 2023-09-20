import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";
import withHeaderAndFooter from "../../hoc/withHeaderAndFooter";
import useYourMealService from "../../services/YourMealService";
import FoodItemInfoSample from "./FoodItemInfoSample/FoodItemInfoSample";
import Spinner from "../../components/Spinner/Spinner";

import { imagesObj } from "../../components/FoodItemCard/FoodImgArr";

import st from "./FoodItemInfo.module.scss";

Yup.setLocale({
  number: {
    positive: "Число товаров должно быть положительным",
    integer: "Число товаров должно быть целым",
  },
});

const FoodItemInfo = ({ guestMode, currUserData, setCurrUserData }) => {
  const navigate = useNavigate();
  const { uniqueCategoryId, uniqueFoodKey } = useParams();
  const [foodItem, setFoodItem] = useState(null);

  const {
    loading: foodLoading,
    serverError: foodServerError,
    getFoodCategoryById,
  } = useYourMealService();

  const {
    loading: userDataSending,
    serverError: userDataServerError,
    clearServerError: clearUserDataServerError,
    updateUserBasketOnServer,
  } = useYourMealService();

  const userAmountOfThisFoodInBasket = currUserData.basket[uniqueFoodKey]
    ? currUserData.basket[uniqueFoodKey].amount
    : 0;

  useEffect(() => {
    getFoodCategoryById(uniqueCategoryId).then((categoryData) => {
      setFoodItem(
        categoryData.items.find(
          (foodItem) => foodItem.uniqueFoodKey === uniqueFoodKey
        )
      );
    });
  }, []);

  const updateCurrUserData = (newUserDataState, resetForm) => {
    if (guestMode) {
      setCurrUserData(() => newUserDataState);
      navigate("/");
    } else {
      clearUserDataServerError();
      updateUserBasketOnServer(newUserDataState.id, newUserDataState).then(
        () => {
          resetForm();
          setCurrUserData(() => newUserDataState);
          navigate("/");
        }
      );
    }
  };

  return (
    <>
      {foodLoading ? (
        <FoodItemInfoSample />
      ) : (
        <main className={st["food-item-info"]}>
          <Link
            to="/"
            className={
              foodLoading || userDataSending
                ? `${st["food-item-info__link-to-home"]} ${st["food-item-info__link-to-home_disabled"]}`
                : st["food-item-info__link-to-home"]
            }
            onClick={(e) =>
              foodLoading || userDataSending ? e.preventDefault() : null
            }
          >
            На главную
          </Link>
          {foodServerError ? (
            <h2
              className={st["food-item-info__error-headline"]}
            >{`Ошибка при попытке получения данных о товаре: ${foodServerError}`}</h2>
          ) : (
            <>
              <img
                src={imagesObj[uniqueCategoryId][uniqueFoodKey]}
                alt={foodItem?.label}
                className={st["food-item-info__img"]}
              />
              <div className={st["food-item-info__text-wrapper"]}>
                <span className={st["food-item-info__label-label"]}>
                  Название:
                </span>
                <span className={st["food-item-info__label"]}>
                  {foodItem?.label}
                </span>
                <span className={st["food-item-info__price-label"]}>Цена:</span>
                <span className={st["food-item-info__price"]}>
                  {foodItem?.price}₽
                </span>
                <span className={st["food-item-info__weight-label"]}>Вес:</span>
                <span className={st["food-item-info__weight"]}>
                  {foodItem?.weight}г
                </span>
              </div>
              <Formik
                initialValues={{
                  itemsAmountToAdd: 1,
                }}
                validationSchema={Yup.object({
                  itemsAmountToAdd: Yup.number()
                    .typeError("Вы ввели не число")
                    .positive()
                    .integer()
                    .lessThan(
                      101 - userAmountOfThisFoodInBasket,
                      `Вы не можете добавить в корзину более 100 единиц товара одного типа. 
                      У вас сейчас: ${userAmountOfThisFoodInBasket}`
                    )
                    .required("Обязательное поле"),
                })}
                onSubmit={({ itemsAmountToAdd }, { resetForm }) => {
                  const newBasketState = {};
                  for (const foodItemKey in currUserData.basket) {
                    newBasketState[foodItemKey] = {
                      ...currUserData.basket[foodItemKey],
                    };
                  }
                  const newUserDataState = guestMode
                    ? { basket: newBasketState }
                    : {
                        name: currUserData.name,
                        password: currUserData.password,
                        basket: newBasketState,
                        id: currUserData.id,
                      };
                  newUserDataState.basket[uniqueFoodKey]
                    ? (newUserDataState.basket[uniqueFoodKey].amount +=
                        itemsAmountToAdd)
                    : (newUserDataState.basket[uniqueFoodKey] = {
                        uniqueCategoryId: uniqueCategoryId,
                        uniqueFoodKey: uniqueFoodKey,
                        label: foodItem.label,
                        weight: foodItem.weight,
                        price: foodItem.price,
                        amount: itemsAmountToAdd,
                      });
                  updateCurrUserData(newUserDataState, resetForm);
                }}
                initialTouched={{ itemsAmountToAdd: true }}
              >
                {({ values, errors }) => (
                  <Form action="#" className={st["food-item-info__add-form"]}>
                    <label
                      htmlFor="itemsAmountToAdd"
                      className={st["food-item-info__add-headline"]}
                    >
                      Укажите количество товара:
                    </label>
                    <Field
                      id="itemsAmountToAdd"
                      name="itemsAmountToAdd"
                      type="number"
                      min="1"
                      max="100"
                      className={st["food-item-info__number-input"]}
                      required
                    />
                    <FormikErrorMessage
                      component="span"
                      name="itemsAmountToAdd"
                      className={st["food-item-info__error-text"]}
                    />
                    <label className={st["food-item-info__whole-price-label"]}>
                      Общая цена:
                    </label>
                    {foodItem && !errors.itemsAmountToAdd ? (
                      <span className={st["food-item-info__whole-price"]}>{`${
                        foodItem.price * values.itemsAmountToAdd
                      }₽`}</span>
                    ) : (
                      <Spinner color="orange" />
                    )}
                    {userDataSending ? <Spinner color="orange" /> : null}
                    <button
                      type="submit"
                      className={st["food-item-info__sumbit-btn"]}
                      disabled={userDataSending || errors.itemsAmountToAdd}
                    >
                      Добавить
                    </button>
                    {userDataServerError ? (
                      <span className={st["food-item-info__server-error-text"]}>
                        {`Ошибка при попытке обновления корзины: ${userDataServerError}`}
                      </span>
                    ) : null}
                  </Form>
                )}
              </Formik>
            </>
          )}
        </main>
      )}
    </>
  );
};

export default withHeaderAndFooter(FoodItemInfo);
