import { call, put, getContext } from 'redux-saga/effects'
import {
  morfixEvaluateMultiplyCipherByPlainSuccess,
  morfixEvaluateMultiplyCipherByPlainFailure
} from 'store/actions/morfix'

export default function* evaluateMultiplyCipherByPlainWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateMultiplyCipherByPlain, action)
    yield put(morfixEvaluateMultiplyCipherByPlainSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateMultiplyCipherByPlainFailure(error.payload ? error.payload : error))
  }
}
