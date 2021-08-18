import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { rootSaga } from "../saga";
import todoReducer from "../modules/todo";
import { composeWithDevTools } from "redux-devtools-extension";

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
