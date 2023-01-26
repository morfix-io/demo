import { call, put, getContext } from 'redux-saga/effects'
import {
  morfixEvaluatePlainTransformToNTTSuccess,
  morfixEvaluatePlainTransformToNTTFailure
} from 'store/actions/morfix'

export default function* evaluatePlainTransformToNTTWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluatePlainTransformToNTT, action)
    yield put(morfixEvaluatePlainTransformToNTTSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluatePlainTransformToNTTFailure(error.payload ? error.payload : error))
  }
}
