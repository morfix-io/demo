import { call, put, getContext } from 'redux-saga/effects'
import { morfixUploadPlainTextSuccess, morfixUploadPlainTextFailure } from 'store/actions/morfix'

export default function* uploadPlainTextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.uploadPlainText, action)
    yield put(morfixUploadPlainTextSuccess(payload))
  } catch (error) {
    yield put(morfixUploadPlainTextFailure(error.payload ? error.payload : error))
  }
}
