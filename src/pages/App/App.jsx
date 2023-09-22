import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  FoodItemInfo,
  CheckoutPage,
  SignIn,
  SignUp,
  Error,
} from "../index";

import "./App.scss";

function App() {
  const [guestMode, setGuestMode] = useState(
    localStorage.getItem("currentUserId") === null ? true : false
  );
  const [currUserData, setCurrUserData] = useState({ basket: {} });

  function setUserToLocal(user) {
    setGuestMode(false);
    setCurrUserData(user);
    localStorage.setItem("currentUserId", user.id);
  }

  function deleteUserFromLocal() {
    setGuestMode(true);
    setCurrUserData({ basket: {} });
    localStorage.removeItem("currentUserId");
  }

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                guestMode={guestMode}
                currUserData={currUserData}
                setCurrUserData={setCurrUserData}
                deleteUserFromLocal={deleteUserFromLocal}
              />
            }
          />
          <Route
            path="/:uniqueCategoryId/:uniqueFoodKey"
            element={
              <FoodItemInfo
                guestMode={guestMode}
                currUserData={currUserData}
                setCurrUserData={setCurrUserData}
                deleteUserFromLocal={deleteUserFromLocal}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                guestMode={guestMode}
                currUserData={currUserData}
                setCurrUserData={setCurrUserData}
                deleteUserFromLocal={deleteUserFromLocal}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<SignIn setUserToLocal={setUserToLocal} />}
          />
          <Route
            path="/sign-up"
            element={<SignUp setUserToLocal={setUserToLocal} />}
          />
          <Route
            path="*"
            element={
              <Error
                guestMode={guestMode}
                currUserData={currUserData}
                setCurrUserData={setCurrUserData}
                deleteUserFromLocal={deleteUserFromLocal}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
