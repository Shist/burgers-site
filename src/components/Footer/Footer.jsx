import st from "./Footer.module.scss";
import logoText from "../../images/footer/logo-text.svg";
import logoImage from "../../images/footer/logo-img.svg";
import phoneImage from "../../images/footer/phone.svg";
import vkImage from "../../images/footer/vk.svg";
import telegramImage from "../../images/footer/telegram.svg";

function Footer() {
  return (
    <footer className={st.footer}>
      <div className={st["footer__logo-copyrights-wrapper"]}>
        <div className={st["footer__logo-wrapper"]}>
          <img
            src={logoText}
            alt="Your meal"
            className={st["footer__logo-text"]}
          />
          <img
            src={logoImage}
            alt="Your meal logo"
            className={st["footer__logo-img"]}
          />
        </div>
        <div className={st["footer__copyrights-wrapper"]}>
          <span className={st["footer__copyrights-text"]}>
            &copy; YouMeal, 2022
          </span>
          <span className={st["footer__copyrights-author"]}>
            Design: Anastasia Ilina
          </span>
        </div>
      </div>
      <div className={st["footer__order-phone-wrapper"]}>
        <span className={st["footer__phone-label"]}>Номер для заказа</span>
        <div className={st["footer__phone-wrapper"]}>
          <img
            src={phoneImage}
            alt="Phone"
            className={st["footer__phone-img"]}
          />
          <span className={st["footer__phone-number"]}>+7(930)833-38-11</span>
        </div>
      </div>
      <div className={st["footer__socials-wrapper"]}>
        <span className={st["footer__socials-label"]}>Мы в соцсетях</span>
        <div className={st["footer__socials-links-wrapper"]}>
          <a
            href="https://vk.com/"
            target="_blank"
            className={st["footer__vk-link"]}
            rel="noreferrer"
          >
            <img src={vkImage} alt="vk" className={st["footer__vk-icon"]} />
          </a>
          <a
            href="https://web.telegram.org/"
            target="_blank"
            className={st["footer__telegram-link"]}
            rel="noreferrer"
          >
            <img
              src={telegramImage}
              alt="telegram"
              className={st["footer__telegram-icon"]}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
