const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  socket: null,
  isconnect: false,
  error: null,
  messages: [
    {
      id: 0,
      text: "",
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    ADD_MSG(state, action) {
      state.messages.push({
        id: action.payload.id,
        text: action.payload.payload,
      });
    },
    GET_CHAT(state, action) {
      state.messages = action.payload;
    },
    CONNECT_SOCKET(state, action) {
      state.isconnect = false;
    },
    SOCKET_CONNECTION_SUCCESS(state, action) {
      state.socket = action.payload;
      state.isconnect = true;
      state.error = null;
    },
    SOCKET_CONNECTION_ERROR(state, action) {
      state.isconnect = false;
      state.error = action.payload;
    },
    SOCKET_DISCONNECT(state, action) {},
    SOCKET_DISCONNECT_SUCCESS(state, aciton) {},
  },
});

const { reducer, actions } = chatSlice;
export const {
  ADD_MSG,
  GET_CHAT,
  SOCKET_CONNECTION_SUCCESS,
  SOCKET_CONNECTION_ERROR,
  SOCKET_DISCONNECT,
  SOCKET_DISCONNECT_SUCCESS,
  CONNECT_SOCKET,
} = actions;
export default reducer;
