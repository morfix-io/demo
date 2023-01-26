import { call, put, getContext } from 'redux-saga/effects'
import { morfixReadPlainTextSuccess, morfixReadPlainTextFailure } from 'store/actions/morfix'

export default function* readPlainTextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.readPlainText, action)
    yield put(morfixReadPlainTextSuccess(payload))
  } catch (error) {
    yield put(morfixReadPlainTextFailure(error.payload ? error.payload : error))
  }
}
