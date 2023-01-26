import { call, put, getContext } from 'redux-saga/effects'
import { morfixEvaluateDotProductPlainSuccess, morfixEvaluateDotProductPlainFailure } from 'store/actions/morfix'

export default function* evaluateDotProductPlainWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateDotProductPlain, action)
    yield put(morfixEvaluateDotProductPlainSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateDotProductPlainFailure(error.payload ? error.payload : error))
  }
}
