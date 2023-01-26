import { call, put, getContext } from 'redux-saga/effects'
import { morfixUploadPublicKeySuccess, morfixUploadPublicKeyFailure } from 'store/actions/morfix'

export default function* uploadPublicKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.uploadPublicKey, action)
    yield put(morfixUploadPublicKeySuccess(payload))
  } catch (error) {
    yield put(morfixUploadPublicKeyFailure(error.payload ? error.payload : error))
  }
}
