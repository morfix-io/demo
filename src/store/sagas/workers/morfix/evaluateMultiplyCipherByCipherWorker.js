import { call, put, getContext } from 'redux-saga/effects'
import {
  morfixEvaluateMultiplyCipherByCipherSuccess,
  morfixEvaluateMultiplyCipherByCipherFailure
} from 'store/actions/morfix'

export default function* evaluateMultiplyCipherByCipherWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateMultiplyCipherByCipher, action)
    yield put(morfixEvaluateMultiplyCipherByCipherSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateMultiplyCipherByCipherFailure(error.payload ? error.payload : error))
  }
}
