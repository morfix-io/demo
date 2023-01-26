import { call, put, getContext } from 'redux-saga/effects'
import { morfixDeletePublicKeySuccess, morfixDeletePublicKeyFailure } from 'store/actions/morfix'

export default function* deletePublicKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.deletePublicKey, action)
    yield put(morfixDeletePublicKeySuccess(payload))
  } catch (error) {
    yield put(morfixDeletePublicKeyFailure(error.payload ? error.payload : error))
  }
}
