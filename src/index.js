import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import Reducers from "./modules/todo";
import Root from "./Root";
import { Provider } from "react-redux";

const store = createStore(Reducers);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
