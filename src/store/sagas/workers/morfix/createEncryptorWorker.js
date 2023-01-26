import { call, put, getContext } from 'redux-saga/effects'
import { morfixCreateEncryptorSuccess, morfixCreateEncryptorFailure } from 'store/actions/morfix'

export default function* createEncryptorWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.createEncryptor, action)
    yield put(morfixCreateEncryptorSuccess(payload))
  } catch (error) {
    yield put(morfixCreateEncryptorFailure(error.payload ? error.payload : error))
  }
}
