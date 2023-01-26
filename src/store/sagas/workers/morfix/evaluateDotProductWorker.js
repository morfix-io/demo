import { call, put, getContext } from 'redux-saga/effects'
import { morfixEvaluateDotProductSuccess, morfixEvaluateDotProductFailure } from 'store/actions/morfix'

export default function* evaluateDotProductWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateDotProduct, action)
    yield put(morfixEvaluateDotProductSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateDotProductFailure(error.payload ? error.payload : error))
  }
}
