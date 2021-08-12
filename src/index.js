import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import Reducers from "./modules/todo";
import App from "./containers/App";
import { Provider } from "react-redux";

const store = createStore(Reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
