import { call, put, getContext } from 'redux-saga/effects'
import { morfixUploadCipherTextSuccess, morfixUploadCipherTextFailure } from 'store/actions/morfix'

export default function* uploadCipherTextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.uploadCipherText, action)
    yield put(morfixUploadCipherTextSuccess(payload))
  } catch (error) {
    yield put(morfixUploadCipherTextFailure(error.payload ? error.payload : error))
  }
}
