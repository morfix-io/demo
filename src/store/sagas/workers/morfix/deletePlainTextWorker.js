import { call, put, getContext } from 'redux-saga/effects'
import { morfixDeletePlainTextSuccess, morfixDeletePlainTextFailure } from 'store/actions/morfix'

export default function* deletePlainTextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.deletePlainText, action)
    yield put(morfixDeletePlainTextSuccess(payload))
  } catch (error) {
    yield put(morfixDeletePlainTextFailure(error.payload ? error.payload : error))
  }
}
