import React from "react";
import ReactDOM from "react-dom";

import configureMobX from "config/configureMobX.ts";

import "regenerator-runtime";

import "./index.module.scss";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

if(module.hot){
    module.hot.accept();
}

