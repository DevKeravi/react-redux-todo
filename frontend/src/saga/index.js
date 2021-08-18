import { all, fork } from "redux-saga/effects";
import { addPostSaga, getPostsSaga } from "./todoSaga";

export function* rootSaga() {
  yield all([fork(getPostsSaga), fork(addPostSaga)]);
}
