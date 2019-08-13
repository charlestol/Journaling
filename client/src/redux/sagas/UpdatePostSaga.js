import { take, fork, call, put } from "redux-saga/effects";
import { POSTS } from "../../constants";
import { updatePost } from "../../api";
import { loadPosts, setError } from "../actions";

function* handleUpdatePost(post) {
  try {
    console.log("handling update", post);
    yield call(updatePost, post);
    yield put(loadPosts());
  } catch (e) {
    yield put(setError(e.toString()));
  }
}

export default function* watchUpdatePost() {
  while (true) {
    const { payload } = yield take(POSTS.UPDATE);
    yield fork(handleUpdatePost, payload.post);
  }
}