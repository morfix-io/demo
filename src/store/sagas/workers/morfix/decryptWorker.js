import { call, put, getContext } from 'redux-saga/effects'
import { morfixDecryptSuccess, morfixDecryptFailure } from 'store/actions/morfix'

export default function* decryptWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.decrypt, action)
    yield put(morfixDecryptSuccess(payload))
  } catch (error) {
    yield put(morfixDecryptFailure(error.payload ? error.payload : error))
  }
}
