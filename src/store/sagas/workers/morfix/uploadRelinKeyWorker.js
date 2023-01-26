import { call, put, getContext } from 'redux-saga/effects'
import { morfixUploadRelinKeySuccess, morfixUploadRelinKeyFailure } from 'store/actions/morfix'

export default function* uploadRelinKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.uploadRelinKey, action)
    yield put(morfixUploadRelinKeySuccess(payload))
  } catch (error) {
    yield put(morfixUploadRelinKeyFailure(error.payload ? error.payload : error))
  }
}
