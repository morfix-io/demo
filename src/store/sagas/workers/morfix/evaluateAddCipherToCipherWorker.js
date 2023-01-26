import { call, put, getContext } from 'redux-saga/effects'
import { morfixEvaluateAddCipherToCipherSuccess, morfixEvaluateAddCipherToCipherFailure } from 'store/actions/morfix'

export default function* evaluateAddCipherToCipherWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateAddCipherToCipher, action)
    yield put(morfixEvaluateAddCipherToCipherSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateAddCipherToCipherFailure(error.payload ? error.payload : error))
  }
}
