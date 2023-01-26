import { call, put, getContext } from 'redux-saga/effects'
import { morfixEvaluateRelinearizeCipherSuccess, morfixEvaluateRelinearizeCipherFailure } from 'store/actions/morfix'

export default function* evaluateRelinearizeCipherWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateRelinearizeCipher, action)
    yield put(morfixEvaluateRelinearizeCipherSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateRelinearizeCipherFailure(error.payload ? error.payload : error))
  }
}
