import { put, takeLatest, all } from 'redux-saga/effects'
import { signup as signUp, login as signIn } from "../../utils";

export function* signup (data) {
    yield takeLatest('SIGNUP_ASYNC', signupAsync(data))
}

function* signupAsync(data) {
    console.log(data)
    try {
        let data_ 
        signUp(data.email, data.password).then(res => {data_ = res})
        console.log(data_)
        if (data_.error) {
            yield put({
                type: 'SIGNUP_ERROR',
                user: data_
            })
        } else {
            yield put({
                type: 'SIGNUP',
                data_
            })
        }
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
    console.log(data)
    try {
        let data_ 
        signIn(data.email, data.password).then(res => {data_ = res})
        console.log(data_)
        if (data_.error) {
            yield put({
                type: 'SIGNIN_ERROR',
                user: data_
            })
        } else {
            yield put({
                type: 'SIGNIN',
                data_
            })
        }
    } catch (error) {
        yield put({
            type: 'SIGNIN_ERROR',
            error
        })
    }
}

export default function* userSaga() {
    yield all([
      signin,
      signup
    ])
  }
