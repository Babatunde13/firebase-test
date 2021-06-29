import { all } from "redux-saga/effects";
import { addTimestamp } from "./timestamp";
import userSaga from "./user";

export default function* rootSaga() {
    yield all([
        addTimestamp,
        userSaga
    ])
  }