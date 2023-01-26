import { call, put, getContext } from 'redux-saga/effects'
import { morfixGenerateRelinKeySuccess, morfixGenerateRelinKeyFailure } from 'store/actions/morfix'

export default function* generateRelinKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.generateRelinKey, action)
    yield put(morfixGenerateRelinKeySuccess(payload))
  } catch (error) {
    yield put(morfixGenerateRelinKeyFailure(error.payload ? error.payload : error))
  }
}
