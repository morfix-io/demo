import { call, put, getContext } from 'redux-saga/effects'
import { morfixBatchDecodeInt32Success, morfixBatchDecodeInt32Failure } from 'store/actions/morfix'

export default function* batchDecodeInt32Worker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.batchDecodeInt32, action)
    yield put(morfixBatchDecodeInt32Success(payload))
  } catch (error) {
    yield put(morfixBatchDecodeInt32Failure(error.payload ? error.payload : error))
  }
}
