import { call, put, getContext } from 'redux-saga/effects'
import { morfixGenerateSecretKeySuccess, morfixGenerateSecretKeyFailure } from 'store/actions/morfix'

export default function* generateSecretKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.generateSecretKey, action)
    yield put(morfixGenerateSecretKeySuccess(payload))
  } catch (error) {
    yield put(morfixGenerateSecretKeyFailure(error.payload ? error.payload : error))
  }
}
