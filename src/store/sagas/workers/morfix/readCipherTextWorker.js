import { call, put, getContext } from 'redux-saga/effects'
import { morfixReadCipherTextSuccess, morfixReadCipherTextFailure } from 'store/actions/morfix'

export default function* readCipherTextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.readCipherText, action)
    yield put(morfixReadCipherTextSuccess(payload))
  } catch (error) {
    yield put(morfixReadCipherTextFailure(error.payload ? error.payload : error))
  }
}
