import { call, put, getContext } from 'redux-saga/effects'
import { morfixLoadCipherTextSuccess, morfixLoadCipherTextFailure } from 'store/actions/morfix'

export default function* loadCipherTextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.loadCipherText, action)
    yield put(morfixLoadCipherTextSuccess(payload))
  } catch (error) {
    yield put(morfixLoadCipherTextFailure(error.payload ? error.payload : error))
  }
}
