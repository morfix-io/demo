import { call, put, getContext } from 'redux-saga/effects'
import { morfixDownloadPublicKeySuccess, morfixDownloadPublicKeyFailure } from 'store/actions/morfix'

export default function* downloadPublicKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.downloadPublicKey, action)
    yield put(morfixDownloadPublicKeySuccess(payload))
  } catch (error) {
    yield put(morfixDownloadPublicKeyFailure(error.payload ? error.payload : error))
  }
}
