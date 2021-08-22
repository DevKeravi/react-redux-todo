import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  data: [
    {
      id: 0,
      text: "",
      isdone: false,
      date: null,
    },
  ],
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    ADD(state, action) {
      state.error = null;
      state.isLoading = true;
    },
    ADD_POST_SUCCESS(state, action) {
      state.isLoading = false;
    },
    ADD_POST_ERROR(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    DEL(state, action) {},
    GET(state, action) {
      state.isLoading = true;
    },
    GET_POSTS_SUCCESS(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    GET_POSTS_ERROR(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    DONE(state, action) {},
    INITALIZE_WS_CHANNEL(state, action) {},
  },
});

const { reducer, actions } = todoSlice;
export const {
  ADD,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
  DEL,
  GET,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  DONE,
  INITALIZE_WS_CHANNEL,
} = actions;
export default reducer;
/*
const ADD = "todo/ADD";
const DEL = "todo/DEL";
const GET = "todo/GET";
const DONE = "todo/DONE";

const GET_POSTS_SUCCESS = "todo/GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "todo/GET_POSTS_ERROR";

const ADD_POST_SUCCESS = "todo/ADD_POSTS_SUCCESS";
const ADD_POST_ERROR = "todo/ADD_POST_ERROR";

export const add = createAction(ADD);
export const del = createAction(DEL);
export const get = createAction(GET);
export const done = createAction(DONE);

const todoReducer = createReducer(
  initialState,
  {
    [ADD]: (state, action) => {
      //return state.set("isLoading", true);
      state.isLoading = true;
    },
    [ADD_POST_SUCCESS]: (state, action) => {
      //return state.set("isLoading", false);
      state.isLoading = false;
    },
    [ADD_POST_ERROR]: (state, action) => {
      //return state.merge({ isLoading: false, error: action.payload });
      state.isLoading = false;
      state.error = action.payload;
    },
    [DEL]: (state, action) => {
      return;
    },
    [GET]: (state, action) => {
      //return state.set("isLoading", true);
      state.isLoading = true;
    },
    [GET_POSTS_SUCCESS]: (state, action) => {
      //return state.merge({ isLoading: false, data: action.payload });
      state.isLoading = false;
      state.data = action.payload;
    },
    [GET_POSTS_ERROR]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [DONE]: (state, action) => {
      return;
    },
  },
  initialState
);
*/
