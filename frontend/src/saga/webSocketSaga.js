import { call, cancelled, put, take, takeEvery } from "redux-saga/effects";
import { END, eventChannel } from "redux-saga";
import createWebSocketConnection from "../webSocket/socket";
import {
  ADD_MSG,
  CONNECT_SOCKET,
  SOCKET_CONNECTION_ERROR,
  SOCKET_CONNECTION_SUCCESS,
} from "../modules/chat";

function createEventChannel(socket) {
  return eventChannel((emit) => {
    socket.onmessage = (event) => {
      emit(event.data);
    };
    socket.onclose = () => {
      emit(END);
    };

    const unsubscribe = () => {
      socket.onmessage = null;
    };
    return unsubscribe;
  });
}

function* listenForSocketMessages() {
  let socket;
  let socketChannel;

  try {
    socket = yield call(createWebSocketConnection);
    socketChannel = yield call(createEventChannel, socket);
    yield put(SOCKET_CONNECTION_SUCCESS(socket));

    while (true) {
      const payload = yield take(socketChannel);
      const parsedData = yield JSON.parse(payload);
      switch (parsedData.type) {
        case "added":
          yield put(ADD_MSG(parsedData));
        default:
          yield;
      }
    }
  } catch (e) {
    yield put(SOCKET_CONNECTION_ERROR(e));
  } finally {
    if (yield cancelled()) {
      socketChannel.close();
      socket.close();
    } else {
      yield put(SOCKET_CONNECTION_ERROR("WebSocket disconnected"));
    }
  }
}

export function* connectWebSocket() {
  yield takeEvery(CONNECT_SOCKET, listenForSocketMessages);

  //DISCONNECT TODO
  /*
  yield take(SOCKET_DISCONNECT);
  yield cancel(socketTask);
  yield put(SOCKET_DISCONNECT_SUCCESS);
  */
}
