import { call, put, getContext } from 'redux-saga/effects'
import { morfixGeneratePublicKeySuccess, morfixGeneratePublicKeyFailure } from 'store/actions/morfix'

export default function* generatePublicKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.generatePublicKey, action)
    yield put(morfixGeneratePublicKeySuccess(payload))
  } catch (error) {
    yield put(morfixGeneratePublicKeyFailure(error.payload ? error.payload : error))
  }
}
