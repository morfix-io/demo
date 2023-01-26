import { call, put, getContext } from 'redux-saga/effects'
import { morfixCreateDecryptorSuccess, morfixCreateDecryptorFailure } from 'store/actions/morfix'

export default function* createDecryptorWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.createDecryptor, action)
    yield put(morfixCreateDecryptorSuccess(payload))
  } catch (error) {
    yield put(morfixCreateDecryptorFailure(error.payload ? error.payload : error))
  }
}
