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
    yield put(GET_POSTS_SUCCESS(posts));
  } catch (e) {
    yield put(GET_POSTS_ERROR(e));
  }
}

function* addPost(action) {
  try {
    const result = yield call(postApi.createPost, action.payload);
    yield put(ADD_POST_SUCCESS());
  } catch (e) {
    yield put(ADD_POST_ERROR(e));
  }
}

export function* getPostsSaga() {
  yield takeEvery(GET, getPosts);
}
export function* addPostSaga() {
  yield takeEvery(ADD, addPost);
}
