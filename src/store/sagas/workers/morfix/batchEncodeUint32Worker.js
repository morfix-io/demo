import { call, put, getContext } from 'redux-saga/effects'
import { morfixBatchEncodeUint32Success, morfixBatchEncodeUint32Failure } from 'store/actions/morfix'

export default function* batchEncodeUint32Worker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.batchEncodeUint32, action)
    yield put(morfixBatchEncodeUint32Success(payload))
  } catch (error) {
    yield put(morfixBatchEncodeUint32Failure(error.payload ? error.payload : error))
  }
}
