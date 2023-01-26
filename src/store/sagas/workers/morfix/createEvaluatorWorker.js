import { call, put, getContext } from 'redux-saga/effects'
import { morfixCreateEvaluatorSuccess, morfixCreateEvaluatorFailure } from 'store/actions/morfix'

export default function* createEvaluatorWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.createEvaluator, action)
    yield put(morfixCreateEvaluatorSuccess(payload))
  } catch (error) {
    yield put(morfixCreateEvaluatorFailure(error.payload ? error.payload : error))
  }
}
