import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./styles/index.scss";
import App from "./pages/App/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
