import { call, put, getContext } from 'redux-saga/effects'
import {
  morfixEvaluateCipherRescaleToNextSuccess,
  morfixEvaluateCipherRescaleToNextFailure
} from 'store/actions/morfix'

export default function* evaluateCipherRescaleToNextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateCipherRescaleToNext, action)
    yield put(morfixEvaluateCipherRescaleToNextSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateCipherRescaleToNextFailure(error.payload ? error.payload : error))
  }
}
