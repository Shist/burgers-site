import { useState, useEffect } from "react";
import useYourMealService from "../services/YourMealService";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import BottomFixedSpinner from "../components/BottomFixedSpinner/BottomFixedSpinner";

const withHeaderAndFooter = (PageComponent) => {
  return function ({
    guestMode,
    currUserData,
    setCurrUserData,
    deleteUserFromLocal,
    ...otherProps
  }) {
    const [burgerMenu, setBurgerMenu] = useState(false);
    const [isDataSendingNow, setIsDataSendingNow] = useState(false);

    const { loading, serverError, getUserById } = useYourMealService();

    useEffect(() => {
      if (!guestMode && !currUserData.name) {
        getUserById(localStorage.getItem("currentUserId")).then((userData) => {
          setCurrUserData(userData);
        });
      }
    }, []);

    const TABLET_WIDTH = 768;
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth > TABLET_WIDTH) {
          setBurgerMenu(false);
        }
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <>
        <Header
          burgerMenu={burgerMenu}
          setBurgerMenu={setBurgerMenu}
          guestMode={guestMode}
          deleteUserFromLocal={deleteUserFromLocal}
          currUserData={currUserData}
          loading={loading}
          serverError={serverError}
        />
        <PageComponent
          guestMode={guestMode}
          currUserData={currUserData}
          setCurrUserData={setCurrUserData}
          isDataSendingNow={isDataSendingNow}
          setIsDataSendingNow={setIsDataSendingNow}
          {...otherProps}
        />
        <Footer />
        <BurgerMenu
          burgerMenu={burgerMenu}
          setBurgerMenu={setBurgerMenu}
          guestMode={guestMode}
          deleteUserFromLocal={deleteUserFromLocal}
          currUserData={currUserData}
          loading={loading}
          serverError={serverError}
        />
        <BottomFixedSpinner dataIsSending={isDataSendingNow} />
      </>
    );
  };
};

export default withHeaderAndFooter;
