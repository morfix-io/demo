import { call, put, getContext } from 'redux-saga/effects'
import { morfixUploadGaloisKeySuccess, morfixUploadGaloisKeyFailure } from 'store/actions/morfix'

export default function* uploadGaloisKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.uploadGaloisKey, action)
    yield put(morfixUploadGaloisKeySuccess(payload))
  } catch (error) {
    yield put(morfixUploadGaloisKeyFailure(error.payload ? error.payload : error))
  }
}
