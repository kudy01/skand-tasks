import { call, put, takeLatest } from "redux-saga/effects";

import { REQUEST_API_DATA, receiveApiData } from "./user.actions";
import { fetchData } from "../../api";

function* getApiData(action) {
  try {
    const data = yield call(fetchData);
    yield put(receiveApiData(data));
  } catch (e) {
    console.log(e);
  }
}

export default function* userSaga() {
  yield takeLatest(REQUEST_API_DATA, getApiData);
}