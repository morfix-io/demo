import { call, put, getContext } from 'redux-saga/effects'
import {
  morfixEvaluateCipherTransformFromNTTSuccess,
  morfixEvaluateCipherTransformFromNTTFailure
} from 'store/actions/morfix'

export default function* evaluateCipherTransformFromNTTWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateCipherTransformFromNTT, action)
    yield put(morfixEvaluateCipherTransformFromNTTSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateCipherTransformFromNTTFailure(error.payload ? error.payload : error))
  }
}
