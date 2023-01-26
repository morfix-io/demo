import { call, put, getContext } from 'redux-saga/effects'
import { morfixEvaluateRotateColumnsSuccess, morfixEvaluateRotateColumnsFailure } from 'store/actions/morfix'

export default function* evaluateRotateColumnsWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateRotateColumns, action)
    yield put(morfixEvaluateRotateColumnsSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateRotateColumnsFailure(error.payload ? error.payload : error))
  }
}
