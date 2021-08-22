import { all, fork } from "redux-saga/effects";
import { addPostSaga, getPostsSaga } from "./todoSaga";
import { initWebSocket } from "./webSocketSaga";

export function* rootSaga() {
  yield all([fork(getPostsSaga), fork(addPostSaga), fork(initWebSocket)]);
}
