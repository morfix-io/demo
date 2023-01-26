import { call, put, getContext } from 'redux-saga/effects'
import { morfixDownloadRelinKeySuccess, morfixDownloadRelinKeyFailure } from 'store/actions/morfix'

export default function* downloadRelinKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.downloadRelinKey, action)
    yield put(morfixDownloadRelinKeySuccess(payload))
  } catch (error) {
    yield put(morfixDownloadRelinKeyFailure(error.payload ? error.payload : error))
  }
}
