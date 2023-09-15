import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp, Error } from "../index";

import "./App.scss";

function App() {
  const [guestMode, setGuestMode] = useState(
    localStorage.getItem("currentUserId") === null ? true : false
  );

  function setUserToLocalStorage(userName, userId, userPassword) {
    setGuestMode(false);
    localStorage.setItem("currentUserId", userId);
    localStorage.setItem("currentUser", userName);
    localStorage.setItem("currentUserPassword", userPassword);
  }

  function deleteUserFromLocalStorage() {
    setGuestMode(true);
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserPassword");
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
                deleteUserFromLocalStorage={deleteUserFromLocalStorage}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<SignIn setUserToLocalStorage={setUserToLocalStorage} />}
          />
          <Route
            path="/sign-up"
            element={<SignUp setUserToLocalStorage={setUserToLocalStorage} />}
          />
          <Route
            path="*"
            element={
              <Error
                guestMode={guestMode}
                deleteUserFromLocalStorage={deleteUserFromLocalStorage}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
