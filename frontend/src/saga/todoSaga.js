import { call, put, takeEvery } from "redux-saga/effects";
import * as postApi from "../api/posts";
import {
  ADD_POST_ERROR,
  ADD_POST_SUCCESS,
  GET,
  GET_POSTS_ERROR,
  GET_POSTS_SUCCESS,
  ADD,
} from "../modules/todo";

function* getPosts() {
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

function* addPost(action) {
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

export function* getPostsSaga() {
  yield takeEvery(GET, getPosts);
}
export function* addPostSaga() {
  yield takeEvery(ADD, addPost);
}
