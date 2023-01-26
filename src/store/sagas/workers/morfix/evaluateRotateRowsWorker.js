import { call, put, getContext } from 'redux-saga/effects'
import { morfixEvaluateRotateRowsSuccess, morfixEvaluateRotateRowsFailure } from 'store/actions/morfix'

export default function* evaluateRotateRowsWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateRotateRows, action)
    yield put(morfixEvaluateRotateRowsSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateRotateRowsFailure(error.payload ? error.payload : error))
  }
}
