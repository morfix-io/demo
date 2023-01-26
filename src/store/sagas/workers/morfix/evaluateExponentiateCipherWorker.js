import { call, put, getContext } from 'redux-saga/effects'
import { morfixEvaluateExponentiateCipherSuccess, morfixEvaluateExponentiateCipherFailure } from 'store/actions/morfix'

export default function* evaluateExponentiateCipherWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateExponentiateCipher, action)
    yield put(morfixEvaluateExponentiateCipherSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateExponentiateCipherFailure(error.payload ? error.payload : error))
  }
}
