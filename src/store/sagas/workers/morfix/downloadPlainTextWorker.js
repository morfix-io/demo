import { call, put, getContext } from 'redux-saga/effects'
import { morfixDownloadPlainTextSuccess, morfixDownloadPlainTextFailure } from 'store/actions/morfix'

export default function* downloadPlainTextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.downloadPlainText, action)
    yield put(morfixDownloadPlainTextSuccess(payload))
  } catch (error) {
    yield put(morfixDownloadPlainTextFailure(error.payload ? error.payload : error))
  }
}
