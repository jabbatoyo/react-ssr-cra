import React from "react";
import ReactDOM from "react-dom";
import { Cookies } from "react-cookie-banner";
import Loadable from "react-loadable";
import cssVars from "css-vars-ponyfill";

import createStore from "./store/store";
import App from "./App";

cssVars();

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
const cookies = new Cookies(document.cookie);
const { store, history } = createStore({
  preloadedState: window.__PRELOADED_STATE__,
});

if (process.env.NODE_ENV !== "production") {
  const axe = require("react-axe");

  axe(React, ReactDOM, 1000);
}

Loadable.preloadReady().then(() => {
  renderMethod(
    <App cookies={cookies} history={history} store={store} />,
    document.getElementById("root")
  );
});
