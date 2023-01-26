import { call, put, getContext } from 'redux-saga/effects'
import { morfixEncryptSuccess, morfixEncryptFailure } from 'store/actions/morfix'

export default function* encryptWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.encrypt, action)
    yield put(morfixEncryptSuccess(payload))
  } catch (error) {
    yield put(morfixEncryptFailure(error.payload ? error.payload : error))
  }
}
