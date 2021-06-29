import { put, takeLatest, all } from 'redux-saga/effects'
import { signup as signUp, signin as signIn } from "../../firebaseUtils";

export function* signup (data) {
    yield takeLatest('SIGNUP_ASYNC', signupAsync(data))
}

function* signupAsync(data) {
    console.log(data)
    // try {
    //     let data_ = signUp(data.email, data.password)
    //     yield put({
    //         type: 'SIGNUP',
    //         data_
    //     })
    // } catch (error) {
    //     yield put({
    //         type: 'SIGNUP_ERROR',
    //         error
    //     })
    // }
}

export function* signin (data) {
    yield takeLatest('SIGNIN_ASYNC', signinAsync(data))
}

function* signinAsync(data) {
    try {
        let data_ = signIn(data.email, data.password)
        yield put({
            type: 'SIGNIN',
            data_
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
