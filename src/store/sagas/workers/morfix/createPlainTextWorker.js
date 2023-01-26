import { call, put, getContext } from 'redux-saga/effects'
import { morfixCreatePlainTextSuccess, morfixCreatePlainTextFailure } from 'store/actions/morfix'

export default function* createPlainTextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.createPlainText, action)
    yield put(morfixCreatePlainTextSuccess(payload))
  } catch (error) {
    yield put(morfixCreatePlainTextFailure(error.payload ? error.payload : error))
  }
}
