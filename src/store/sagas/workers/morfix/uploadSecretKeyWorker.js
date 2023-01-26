import { call, put, getContext } from 'redux-saga/effects'
import { morfixUploadSecretKeySuccess, morfixUploadSecretKeyFailure } from 'store/actions/morfix'

export default function* uploadSecretKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.uploadSecretKey, action)
    yield put(morfixUploadSecretKeySuccess(payload))
  } catch (error) {
    yield put(morfixUploadSecretKeyFailure(error.payload ? error.payload : error))
  }
}
