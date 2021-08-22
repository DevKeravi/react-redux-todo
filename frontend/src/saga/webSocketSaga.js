import { call, delay, take, takeEvery } from "redux-saga/effects";
import { INITALIZE_WS_CHANNEL } from "../modules/todo";
import { eventChannel } from "redux-saga";

function createEventChannel() {
  return eventChannel((emit) => {
    const ws = new WebSocket("ws://localhost:5000/ws");
    ws.onopen = () => {
      console.log("Opening Websocket");
      ws.send("hello server");
    };
    ws.onerror = (error) => {
      console.log("webSocket Error:", error);
    };
    ws.onmessage = (e) => {
      return emit({ data: JSON.parse(e.data) });
    };
    ws.onclose = (e) => {
      if (e.code === 1005) {
        console.log("WebSocket closed");
      } else {
        console.log(
          "Socket is closed Unexpectedly. Reconnect will be attempted in 4 second.",
          e.reason
        );
        setTimeout(() => {
          createEventChannel();
        }, 4000);
      }
    };
    return () => {
      console.log("Closing webSocket...");
      ws.close();
    };
  });
}

function* initializeWebScoketsChannel() {
  const channel = yield call(createEventChannel);
  while (true) {
    const { data } = yield take(channel);
    //yield put(updateM)
  }
}

export function* initWebSocket() {
  yield takeEvery(INITALIZE_WS_CHANNEL, initializeWebScoketsChannel);
}
