import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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

import { imagesObj } from "../../components/FoodItemCard/FoodImgArr";

import st from "./FoodItemInfo.module.scss";

Yup.setLocale({
  number: {
    positive: "Число товаров должно быть положительным",
    integer: "Число товаров должно быть целым",
    max: "Вы можете добавить не более 100 единиц товара",
  },
});

const FoodItemInfo = () => {
  const { uniqueCategoryId, uniqueFoodKey } = useParams();
  const [foodItem, setFoodItem] = useState(null);

  const { loading, serverError, getFoodCategoryById } = useYourMealService();

  useEffect(() => {
    getFoodCategoryById(uniqueCategoryId).then((categoryData) => {
      setFoodItem(
        categoryData.items.find(
          (foodItem) => foodItem.uniqueFoodKey === uniqueFoodKey
        )
      );
    });
  }, []);

  return (
    <>
      {loading ? (
        <FoodItemInfoSample />
      ) : (
        <main className={st["food-item-info"]}>
          <Link to="/" className={st["food-item-info__link-to-home"]}>
            На главную
          </Link>
          {serverError ? (
            <h2
              className={st["food-item-info__error-headline"]}
            >{`Ошибка при попытке получения данных о товаре: ${serverError}`}</h2>
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
                    .max(100)
                    .required("Обязательное поле"),
                })}
                onSubmit={({ itemsAmountToAdd }, { resetForm }) => {
                  console.log("sumbit!!!");
                  //   const newHero = {
                  //     id: uuidv4(),
                  //     name: name,
                  //     description: text,
                  //     element: element,
                  //   };
                  //   dispatch(heroCreating());
                  //   request(
                  //     `http://localhost:3001/heroes`,
                  //     "POST",
                  //     JSON.stringify(newHero)
                  //   )
                  //     .then(() => {
                  //       resetForm();
                  //       dispatch(heroCreated(newHero));
                  //     })
                  //     .catch(() => dispatch(heroCreatingError()));
                }}
              >
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
                  <button
                    type="submit"
                    className={st["food-item-info__sumbit-btn"]}
                  >
                    Добавить
                  </button>
                </Form>
              </Formik>
            </>
          )}
        </main>
      )}
    </>
  );
};

export default withHeaderAndFooter(FoodItemInfo);
