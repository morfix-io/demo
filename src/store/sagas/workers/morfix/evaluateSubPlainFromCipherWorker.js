import { call, put, getContext } from 'redux-saga/effects'
import { morfixEvaluateSubPlainFromCipherSuccess, morfixEvaluateSubPlainFromCipherFailure } from 'store/actions/morfix'

export default function* evaluateSubPlainFromCipherWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateSubPlainFromCipher, action)
    yield put(morfixEvaluateSubPlainFromCipherSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateSubPlainFromCipherFailure(error.payload ? error.payload : error))
  }
}
