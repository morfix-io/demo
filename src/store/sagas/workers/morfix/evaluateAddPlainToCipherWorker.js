import { call, put, getContext } from 'redux-saga/effects'
import { morfixEvaluateAddPlainToCipherSuccess, morfixEvaluateAddPlainToCipherFailure } from 'store/actions/morfix'

export default function* evaluateAddPlainToCipherWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateAddPlainToCipher, action)
    yield put(morfixEvaluateAddPlainToCipherSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateAddPlainToCipherFailure(error.payload ? error.payload : error))
  }
}
