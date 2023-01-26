import { call, put, getContext } from 'redux-saga/effects'
import { morfixDownloadGaloisKeySuccess, morfixDownloadGaloisKeyFailure } from 'store/actions/morfix'

export default function* downloadGaloisKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.downloadGaloisKey, action)
    yield put(morfixDownloadGaloisKeySuccess(payload))
  } catch (error) {
    yield put(morfixDownloadGaloisKeyFailure(error.payload ? error.payload : error))
  }
}
