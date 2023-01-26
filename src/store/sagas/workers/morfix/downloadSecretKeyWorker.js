import { call, put, getContext } from 'redux-saga/effects'
import { morfixDownloadSecretKeySuccess, morfixDownloadSecretKeyFailure } from 'store/actions/morfix'

export default function* downloadSecretKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.downloadSecretKey, action)
    yield put(morfixDownloadSecretKeySuccess(payload))
  } catch (error) {
    yield put(morfixDownloadSecretKeyFailure(error.payload ? error.payload : error))
  }
}
