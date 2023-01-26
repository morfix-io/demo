import { call, put, getContext } from 'redux-saga/effects'
import { morfixBatchEncodeInt32Success, morfixBatchEncodeInt32Failure } from 'store/actions/morfix'

export default function* batchEncodeInt32Worker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.batchEncodeInt32, action)
    yield put(morfixBatchEncodeInt32Success(payload))
  } catch (error) {
    yield put(morfixBatchEncodeInt32Failure(error.payload ? error.payload : error))
  }
}
