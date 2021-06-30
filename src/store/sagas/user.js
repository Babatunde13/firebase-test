import { put, takeLatest, all, call, fork } from 'redux-saga/effects'
import { signup as signUp, login as signIn } from "../../utils";

export function* signup (data) {
    yield takeLatest({type: 'SIGNUP'}, signupAsync, data)
}

function* signupAsync(data) {
    console.log(data)
    try {
        let data_ = yield call(signUp,data.email, data.password)
        console.log(data_)
        if (data_.error) {
            yield put({
                type: 'SIGNUP_ERROR',
                user: data_
            })
        } else {
            yield put({
                type: 'SIGNUP_ASYNC',
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
    yield takeLatest({type: 'SIGNIN'}, signinAsync, data)
}

function* signinAsync(data) {
    console.log(data)
    try {
        yield put({
            type: 'ISPENDING'
        })
        let data_  = yield call(signIn, data.email, data.password)
        console.log(data_)
        if (data_.error) {
            yield put({
                type: 'SIGNIN_ERROR',
                user: data_
            })
        } else {
            yield put({
                type: 'SIGNIN_ASYNC',
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
      fork(signin),
      fork(signup)
    ])
  }
