import { call, put, getContext } from 'redux-saga/effects'
import { morfixCreateCipherTextSuccess, morfixCreateCipherTextFailure } from 'store/actions/morfix'

export default function* createCipherTextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.createCipherText, action)
    yield put(morfixCreateCipherTextSuccess(payload))
  } catch (error) {
    yield put(morfixCreateCipherTextFailure(error.payload ? error.payload : error))
  }
}
