import React from "react";

import configureMobX from "@config/configureMobX.ts";
import ReactDOM from "react-dom";

import App from "./App";
import styles from "./index.module.scss";
import reportWebVitals from "./reportWebVitals";
//import root from "./root/root";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
