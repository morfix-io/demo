import { call, put, getContext } from 'redux-saga/effects'
import { morfixLoadPlainTextSuccess, morfixLoadPlainTextFailure } from 'store/actions/morfix'

export default function* loadPlainTextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.loadPlainText, action)
    yield put(morfixLoadPlainTextSuccess(payload))
  } catch (error) {
    yield put(morfixLoadPlainTextFailure(error.payload ? error.payload : error))
  }
}
