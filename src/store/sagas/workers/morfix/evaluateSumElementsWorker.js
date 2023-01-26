import { call, put, getContext } from 'redux-saga/effects'
import { morfixEvaluateSumElementsSuccess, morfixEvaluateSumElementsFailure } from 'store/actions/morfix'

export default function* evaluateSumElementsWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateSumElements, action)
    yield put(morfixEvaluateSumElementsSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateSumElementsFailure(error.payload ? error.payload : error))
  }
}
