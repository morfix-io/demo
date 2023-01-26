import { call, put, getContext } from 'redux-saga/effects'
import { morfixDeleteRelinKeySuccess, morfixDeleteRelinKeyFailure } from 'store/actions/morfix'

export default function* deleteRelinKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.deleteRelinKey, action)
    yield put(morfixDeleteRelinKeySuccess(payload))
  } catch (error) {
    yield put(morfixDeleteRelinKeyFailure(error.payload ? error.payload : error))
  }
}
