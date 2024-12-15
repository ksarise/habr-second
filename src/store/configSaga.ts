import { put, takeEvery, delay } from "redux-saga/effects";
import {
  fetchReviewsStart,
  fetchReviewsSuccess,
  fetchReviewsFailure,
} from "./configStore";
import reviews from "../data/data.json";

function* fetchReviews() {
  try {
    yield delay(1000);
    yield put(fetchReviewsSuccess(reviews.reviews));
  } catch (error) {
    yield put(fetchReviewsFailure("Error fetching reviews"));
  }
}

export default function* reviewsSaga() {
  yield takeEvery(fetchReviewsStart.type, fetchReviews);
}
