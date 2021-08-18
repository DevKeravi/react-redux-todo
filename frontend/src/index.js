import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import { Provider } from "react-redux";
import createStore from "./store/createStore";

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
