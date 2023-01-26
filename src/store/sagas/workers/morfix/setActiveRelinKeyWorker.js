import { call, getContext, put } from 'redux-saga/effects'
import { morfixSetActiveRelinKeySuccess, morfixSetActiveRelinKeyFailure } from 'store/actions/morfix'

export default function* setActiveRelinKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.setActiveRelinKey, action)
    yield put(morfixSetActiveRelinKeySuccess(payload))
  } catch (error) {
    yield put(morfixSetActiveRelinKeyFailure(error.payload ? error.payload : error))
  }
}
