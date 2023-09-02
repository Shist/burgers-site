import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp, Error } from "../index";

import "./App.scss";

function App() {
  const [guestMode, setGuestMode] = useState(
    localStorage.getItem("currentUser") === null ? true : false
  );

  function setUserToLocalStorage(userName) {
    setGuestMode(false);
    localStorage.setItem("currentUser", userName);
  }

  function deleteUserFromLocalStorage() {
    setGuestMode(true);
    localStorage.removeItem("currentUser");
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
