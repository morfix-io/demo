import { call, put, getContext } from 'redux-saga/effects'
import { morfixDeleteCipherTextSuccess, morfixDeleteCipherTextFailure } from 'store/actions/morfix'

export default function* deleteCipherTextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.deleteCipherText, action)
    yield put(morfixDeleteCipherTextSuccess(payload))
  } catch (error) {
    yield put(morfixDeleteCipherTextFailure(error.payload ? error.payload : error))
  }
}
