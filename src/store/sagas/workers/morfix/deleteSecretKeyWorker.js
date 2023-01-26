import { call, put, getContext } from 'redux-saga/effects'
import { morfixDeleteSecretKeySuccess, morfixDeleteSecretKeyFailure } from 'store/actions/morfix'

export default function* deleteSecretKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.deleteSecretKey, action)
    yield put(morfixDeleteSecretKeySuccess(payload))
  } catch (error) {
    yield put(morfixDeleteSecretKeyFailure(error.payload ? error.payload : error))
  }
}
