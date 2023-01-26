import { call, put, getContext } from 'redux-saga/effects'
import {
  morfixEvaluateCipherModulusSwitchToNextSuccess,
  morfixEvaluateCipherModulusSwitchToNextFailure
} from 'store/actions/morfix'

export default function* evaluateCipherModulusSwitchToNextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateCipherModulusSwitchToNext, action)
    yield put(morfixEvaluateCipherModulusSwitchToNextSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateCipherModulusSwitchToNextFailure(error.payload ? error.payload : error))
  }
}
