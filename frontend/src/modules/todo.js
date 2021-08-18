import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";
import * as postApi from "../api/posts";
import { call, put, all, takeEvery } from "redux-saga/effects";

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

const initialState = Map({
  isLoading: false,
  error: null,
  data: List([
    Map({
      id: 0,
      text: "",
      isdone: false,
      date: null,
    }),
  ]),
});
function* getPostsSaga() {
  try {
    const posts = yield call(postApi.getPosts);
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: posts,
    });
  } catch (e) {
    yield put({
      type: GET_POSTS_ERROR,
      error: true,
      payload: e,
    });
  }
}

function* addPostSaga(action) {
  try {
    const result = yield call(postApi.createPost, action.payload);
    yield put({
      type: ADD_POST_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: ADD_POST_ERROR,
      error: true,
      payload: e,
    });
  }
}
export function* postsSaga() {
  yield takeEvery(GET, getPostsSaga);
  yield takeEvery(ADD, addPostSaga);
}

export function* rootSaga() {
  yield all([postsSaga()]);
}

export default handleActions(
  {
    [ADD]: (state, action) => {
      return state.set("isLoading", true);
    },
    //TODO Input data payload
    [ADD_POST_SUCCESS]: (state, action) => {
      return state.set("isLoading", false);
    },
    [ADD_POST_ERROR]: (state, action) => {
      return state.merge({ isLoading: false, error: action.payload });
    },
    [DEL]: (state, action) => {
      return;
    },
    [GET]: (state, action) => {
      return state.set("isLoading", true);
    },
    [GET_POSTS_SUCCESS]: (state, action) => {
      return state.merge({ isLoading: false, data: action.payload });
    },
    [GET_POSTS_ERROR]: (state, action) => {
      return;
    },
    [DONE]: (state, action) => {
      return;
    },
  },
  initialState
);
