import { call, put, getContext } from 'redux-saga/effects'
import {
  morfixEvaluateSubCipherFromCipherSuccess,
  morfixEvaluateSubCipherFromCipherFailure
} from 'store/actions/morfix'

export default function* evaluateSubCipherFromCipherWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.evaluateSubCipherFromCipher, action)
    yield put(morfixEvaluateSubCipherFromCipherSuccess(payload))
  } catch (error) {
    yield put(morfixEvaluateSubCipherFromCipherFailure(error.payload ? error.payload : error))
  }
}
