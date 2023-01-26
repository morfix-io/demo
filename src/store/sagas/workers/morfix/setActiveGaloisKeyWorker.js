import { call, getContext, put } from 'redux-saga/effects'
import { morfixSetActiveGaloisKeySuccess, morfixSetActiveGaloisKeyFailure } from 'store/actions/morfix'

export default function* setActiveGaloisKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.setActiveGaloisKey, action)
    yield put(morfixSetActiveGaloisKeySuccess(payload))
  } catch (error) {
    yield put(morfixSetActiveGaloisKeyFailure(error.payload ? error.payload : error))
  }
}
