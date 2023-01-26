import { call, put, getContext } from 'redux-saga/effects'
import { morfixDownloadCipherTextSuccess, morfixDownloadCipherTextFailure } from 'store/actions/morfix'

export default function* downloadCipherTextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.downloadCipherText, action)
    yield put(morfixDownloadCipherTextSuccess(payload))
  } catch (error) {
    yield put(morfixDownloadCipherTextFailure(error.payload ? error.payload : error))
  }
}
