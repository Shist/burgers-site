import st from "./CheckoutPageSample.module.scss";

function CheckoutPageSample() {
  return (
    <main className={st["checkout-page-sample"]}>
      <div className={st["checkout-page-sample__link-to-home"]} />
      <div className={st["checkout-page-sample__img-form-wrapper"]}>
        <div className={st["checkout-page-sample__img-wrapper"]}></div>
        <div className={st["checkout-page-sample__form-wrapper"]}>
          <div className={st["checkout-page-sample__form"]}>
            <div className={st["checkout-page-sample__form-headline"]} />
            <div className={st["checkout-page-sample__real-name-input"]} />
            <div className={st["checkout-page-sample__phone-input"]} />
            <div className={st["checkout-page-sample__radio-group-wrapper"]}>
              <div className={st["checkout-page-sample__pickup-wrapper"]}>
                <div className={st["checkout-page-sample__pickup-radio-btn"]} />
                <div
                  className={st["checkout-page-sample__pickup-radio-label"]}
                />
              </div>
              <div className={st["checkout-page-sample__delivery-wrapper"]}>
                <div
                  className={st["checkout-page-sample__delivery-radio-btn"]}
                />
                <div
                  className={st["checkout-page-sample__delivery-radio-label"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPageSample;
