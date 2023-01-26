import { call, put, getContext } from 'redux-saga/effects'
import { morfixEvaluateComplexConjugateSuccess, morfixEvaluateComplexConjugateFailure } from 'store/actions/morfix'

export default function* evaluateComplexConjugateWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateComplexConjugate, action)
    yield put(morfixEvaluateComplexConjugateSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateComplexConjugateFailure(error.payload ? error.payload : error))
  }
}
