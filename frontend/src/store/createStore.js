import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { rootSaga } from "../saga";
import todoReducer from "../modules/todo";

const reducers = combineReducers({
  todo: todoReducer,
});

const sagaMiddleware = createSagaMiddleware();
const createStore = () => {
  const store = configureStore({
    reducer: reducers,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
export default createStore;
