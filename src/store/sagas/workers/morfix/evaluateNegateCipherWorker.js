import { call, put, getContext } from 'redux-saga/effects'
import { morfixEvaluateNegateCipherSuccess, morfixEvaluateNegateCipherFailure } from 'store/actions/morfix'

export default function* evaluateNegateCipherWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateNegateCipher, action)
    yield put(morfixEvaluateNegateCipherSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateNegateCipherFailure(error.payload ? error.payload : error))
  }
}
