import { take, fork, call, put } from "redux-saga/effects";
import { POSTS } from "../../constants";
import { deletePost } from "../../api";
import { loadPosts, setError, setMessage } from "../actions";

function* handleDeletePost(id) {
  try {
    yield call(deletePost, id);
    yield put(loadPosts());
    yield put(setMessage("Journal entry successfully deleted"));
  } catch (e) {
    yield put(setError(e.toString()));
  }
}

export default function* watchDeletePost() {
  while (true) {
    const { payload } = yield take(POSTS.DELETE);
    console.log("payload");
    yield fork(handleDeletePost, payload.id);
  }
}
