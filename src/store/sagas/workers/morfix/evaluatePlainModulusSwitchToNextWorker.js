import { call, put, getContext } from 'redux-saga/effects'
import {
  morfixEvaluatePlainModulusSwitchToNextSuccess,
  morfixEvaluatePlainModulusSwitchToNextFailure
} from 'store/actions/morfix'

export default function* evaluatePlainModulusSwitchToNextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluatePlainModulusSwitchToNext, action)
    yield put(morfixEvaluatePlainModulusSwitchToNextSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluatePlainModulusSwitchToNextFailure(error.payload ? error.payload : error))
  }
}
