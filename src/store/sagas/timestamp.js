import { put, takeLatest } from 'redux-saga/effects'

function* addTimeStampAsync(timestamp) {
    try {
        // add a new timestamp to dB
        // update state
        yield put({
            type: 'ADD_TIMESTAMP_ASYNC',
            timestamp
        })
    } catch (error) {
        console.log(error.message)
    }
}

export function* addTimestamp (timestamp) {
    yield takeLatest('ADD_TIMESTAMP', addTimeStampAsync(timestamp))
}