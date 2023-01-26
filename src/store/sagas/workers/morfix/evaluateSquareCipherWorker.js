import { call, put, getContext } from 'redux-saga/effects'
import { morfixEvaluateSquareCipherSuccess, morfixEvaluateSquareCipherFailure } from 'store/actions/morfix'

export default function* evaluateSquareCipherWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateSquareCipher, action)
    yield put(morfixEvaluateSquareCipherSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateSquareCipherFailure(error.payload ? error.payload : error))
  }
}
