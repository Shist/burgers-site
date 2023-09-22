import { Link, useNavigate } from "react-router-dom";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import withHeaderAndFooter from "../../hoc/withHeaderAndFooter";
import useYourMealService from "../../services/YourMealService";
import Spinner from "../../components/Spinner/Spinner";

import donutImg from "../../images/main/checkout/donut.png";

import st from "./CheckoutPage.module.scss";

Yup.setLocale({
  number: {
    integer: "Укажите целое число этажей",
  },
});

const CheckoutPage = ({ guestMode, currUserData, setCurrUserData }) => {
  const navigate = useNavigate();

  const {
    loading,
    serverError,
    clearServerError,
    sendOrderToServer,
    updateUserBasketOnServer,
  } = useYourMealService();

  const userFoodItemsArr = Object.entries(currUserData.basket).map(
    (basketItemKeyValue) => basketItemKeyValue[1]
  );

  const userTotalFoodItemsAmount = userFoodItemsArr.length
    ? userFoodItemsArr
        .map((item) => item.amount)
        .reduce(
          (prevItemAmount, nextItemAmount) => prevItemAmount + nextItemAmount
        )
    : 0;

  const userBasketWholePrice = userFoodItemsArr.length
    ? userFoodItemsArr
        .map((item) => item.price * item.amount)
        .reduce((prevItemPrice, nextItemPrice) => prevItemPrice + nextItemPrice)
    : 0;

  const sendOrder = (orderObj, newUserDataState, resetForm) => {
    clearServerError();
    sendOrderToServer(orderObj).then(() => {
      if (guestMode) {
        resetForm();
        setCurrUserData(() => newUserDataState);
        navigate("/");
      } else {
        updateUserBasketOnServer(newUserDataState.id, newUserDataState).then(
          () => {
            resetForm();
            setCurrUserData(() => newUserDataState);
            navigate("/");
          }
        );
      }
    });
  };

  return (
    <main className={st["checkout"]}>
      <Link to="/" className={st["checkout__link-to-home"]}>
        На главную
      </Link>
      <div className={st["checkout__img-form-wrapper"]}>
        <div className={st["checkout__img-wrapper"]}>
          <img src={donutImg} alt="Donut" />
        </div>
        <div className={st["checkout__form-wrapper"]}>
          <Formik
            initialValues={{
              realName: "",
              phone: "",
              deliveryType: "",
              pickupPlace: "",
              addressDescription: "",
              floor: "",
              doorphoneCode: "",
            }}
            validationSchema={Yup.object({
              realName: Yup.string()
                .typeError("Вы ввели не строку")
                .min(2, "Введите хотя бы 2 символа")
                .max(54, "Вы не можете ввести более 54 символов")
                .required("Обязательное поле"),
              phone: Yup.string()
                .typeError("Вы ввели не строку")
                .matches(
                  /^(\+)?[\d\s()-]+$/,
                  "Вы ввели некорректный номер телефона"
                )
                .required("Обязательное поле"),
              deliveryType: Yup.string()
                .typeError("Вы ввели не строку")
                .oneOf(["pickup", "delivery"], "Вы не выбрали опцию")
                .required("Вы не выбрали опцию"),
              pickupPlace: Yup.string().when("deliveryType", {
                is: (val) => val === "pickup",
                then: (schema) =>
                  schema
                    .typeError("Вы ввели не строку")
                    .oneOf(
                      [
                        "ул. Бургерная, 23",
                        "пр. Пончиковый, 18",
                        "ул. Соусная, 2",
                      ],
                      "Вы не выбрали пункт самовывоза"
                    )
                    .required("Вы не выбрали пункт самовывоза"),
              }),
              addressDescription: Yup.string().when("deliveryType", {
                is: (val) => val === "delivery",
                then: (schema) =>
                  schema
                    .typeError("Вы ввели не строку")
                    .min(8, "Введите хотя бы 8 символов в адресе")
                    .max(64, "Вы не можете ввести более 64 символов в адресе")
                    .required("Укажите адрес"),
              }),
              floor: Yup.number().when("deliveryType", {
                is: (val) => val === "delivery",
                then: (schema) =>
                  schema.typeError("Вы ввели не число").integer(),
              }),
              doorphoneCode: Yup.string().when("deliveryType", {
                is: (val) => val === "delivery",
                then: (schema) => schema.typeError("Вы ввели не строку"),
              }),
            })}
            onSubmit={(
              {
                realName,
                phone,
                deliveryType,
                pickupPlace,
                addressDescription,
                floor,
                doorphoneCode,
              },
              { resetForm }
            ) => {
              const orderObj = {
                id: uuidv4(),
                utcDate: new Date().toUTCString(),
                userId: guestMode ? null : currUserData.id,
                userNickname: guestMode ? null : currUserData.name,
                userName: realName,
                userPhone: phone,
                pickupIsNeeded: deliveryType === "pickup",
                pickupPoint: deliveryType === "pickup" ? pickupPlace : null,
                deliveryIsNeeded: deliveryType === "delivery",
                addressDetails:
                  deliveryType === "delivery"
                    ? {
                        address: addressDescription,
                        floor: floor ? floor : null,
                        doorphoneCode: doorphoneCode ? doorphoneCode : null,
                      }
                    : null,
                foodAmount: userTotalFoodItemsAmount,
                wholePrice: userBasketWholePrice,
                userOrder: currUserData.basket,
              };
              const newUserDataState = guestMode
                ? { basket: {} }
                : {
                    id: currUserData.id,
                    name: currUserData.name,
                    password: currUserData.password,
                    basket: {},
                  };
              sendOrder(orderObj, newUserDataState, resetForm);
            }}
          >
            {({ values, touched }) => (
              <Form action="#" className={st["checkout__form"]}>
                <h2 className={st["checkout__form-headline"]}>Доставка</h2>
                <FormikErrorMessage
                  component="span"
                  name="realName"
                  className={st["checkout__error-text"]}
                />
                <Field
                  id="realName"
                  name="realName"
                  className={st["checkout__real-name-input"]}
                  placeholder="Ваше имя"
                  required
                />
                <FormikErrorMessage
                  component="span"
                  name="phone"
                  className={st["checkout__error-text"]}
                />
                <Field
                  id="phone"
                  name="phone"
                  className={st["checkout__phone-input"]}
                  placeholder="Телефон"
                  required
                />
                <FormikErrorMessage
                  component="span"
                  name="deliveryType"
                  className={st["checkout__error-text"]}
                />
                <div
                  role="group"
                  className={st["checkout__radio-group-wrapper"]}
                >
                  <label className={st["checkout__radio-label"]}>
                    <Field
                      type="radio"
                      name="deliveryType"
                      value="pickup"
                      onClick={() => (touched["pickupPlace"] = false)}
                    />
                    Самовывоз
                  </label>
                  <label className={st["checkout__radio-label"]}>
                    <Field
                      type="radio"
                      name="deliveryType"
                      value="delivery"
                      onClick={() => {
                        touched["addressDescription"] = false;
                        touched["floor"] = false;
                        touched["doorphoneCode"] = false;
                      }}
                    />
                    Доставка
                  </label>
                </div>
                <FormikErrorMessage
                  component="span"
                  id="pickupPlace"
                  name="pickupPlace"
                  className={st["checkout__error-text"]}
                />
                <FormikErrorMessage
                  component="span"
                  id="addressDescription"
                  name="addressDescription"
                  className={st["checkout__error-text"]}
                />
                <FormikErrorMessage
                  component="span"
                  name="floor"
                  className={st["checkout__error-text"]}
                />
                <FormikErrorMessage
                  component="span"
                  name="doorphoneCode"
                  className={st["checkout__error-text"]}
                />
                {values.deliveryType === "pickup" ? (
                  <Field
                    as="select"
                    id="pickupPlace"
                    name="pickupPlace"
                    className={st["checkout__select-pickup"]}
                  >
                    <option value="" hidden>
                      Выбрать пункт самовывоза
                    </option>
                    <option value="ул. Бургерная, 23">ул. Бургерная, 23</option>
                    <option value="пр. Пончиковый, 18">
                      пр. Пончиковый, 18
                    </option>
                    <option value="ул. Соусная, 2">ул. Соусная, 2</option>
                  </Field>
                ) : values.deliveryType === "delivery" ? (
                  <>
                    <Field
                      id="addressDescription"
                      name="addressDescription"
                      className={st["checkout__address-input"]}
                      placeholder="Улица, дом, квартира"
                      required
                    />
                    <div className={st["checkout__floor-doorphone-wrapper"]}>
                      <Field
                        type="number"
                        id="floor"
                        name="floor"
                        className={st["checkout__floor-input"]}
                        placeholder="Этаж"
                      />
                      <Field
                        id="doorphoneCode"
                        name="doorphoneCode"
                        className={st["checkout__doorphone-input"]}
                        placeholder="Домофон"
                      />
                    </div>
                  </>
                ) : null}
                <div className={st["checkout__submit-btn-wrapper"]}>
                  <button type="submit" className={st["checkout__sumbit-btn"]}>
                    Оформить
                  </button>
                  {loading ? <Spinner color="orange" /> : null}
                  {serverError ? (
                    <span className={st["checkout__server-error-text"]}>
                      {`Ошибка при попытке отправки заказа: ${serverError}`}
                    </span>
                  ) : null}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default withHeaderAndFooter(CheckoutPage);
