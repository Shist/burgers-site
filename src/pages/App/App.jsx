import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp, Error } from "../index";

import "./App.scss";

function App() {
  const [guestMode, setGuestMode] = useState(
    localStorage.getItem("currentUserId") === null ? true : false
  );

  function setUserToLocal(userName, userId, userPassword) {
    setGuestMode(false);
    localStorage.setItem("currentUserId", userId);
    localStorage.setItem("currentUser", userName);
    localStorage.setItem("currentUserPassword", userPassword);
  }

  function deleteUserFromLocal() {
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
