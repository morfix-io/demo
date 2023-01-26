import { call, put, getContext } from 'redux-saga/effects'
import {
  morfixEvaluateCipherTransformToNTTSuccess,
  morfixEvaluateCipherTransformToNTTFailure
} from 'store/actions/morfix'

export default function* evaluateCipherTransformToNTTWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateCipherTransformToNTT, action)
    yield put(morfixEvaluateCipherTransformToNTTSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateCipherTransformToNTTFailure(error.payload ? error.payload : error))
  }
}
