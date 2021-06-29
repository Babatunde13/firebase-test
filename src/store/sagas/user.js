import { put, takeLatest, all } from 'redux-saga/effects'
import { signup as signUp, signin as signIn } from "../../firebaseUtils";

export function* signup (data) {
    yield takeLatest('SIGNUP_ASYNC', signupAsync(data))
}

function* signupAsync(data) {
    try {
        let data = signUp(data.email, data.password)
        yield put({
            type: 'SIGNUP',
            data
        })
    } catch (error) {
        yield put({
            type: 'SIGNUP_ERROR',
            error
        })
    }
}

export function* signin (data) {
    yield takeLatest('SIGNIN_ASYNC', signinAsync(data))
}

function* signinAsync(data) {
    try {
        let data = signIn(data.email, data.password)
        yield put({
            type: 'SIGNIN',
            data
        })
    } catch (error) {
        yield put({
            type: 'SIGNIN_ERROR',
            error
        })
    }
}

export default function* rootSaga() {
    yield all([
      signin,
      signup
    ])
  }
