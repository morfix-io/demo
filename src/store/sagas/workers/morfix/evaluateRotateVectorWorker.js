import { call, put, getContext } from 'redux-saga/effects'
import { morfixEvaluateRotateVectorSuccess, morfixEvaluateRotateVectorFailure } from 'store/actions/morfix'

export default function* evaluateRotateVectorWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateRotateVector, action)
    yield put(morfixEvaluateRotateVectorSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateRotateVectorFailure(error.payload ? error.payload : error))
  }
}
