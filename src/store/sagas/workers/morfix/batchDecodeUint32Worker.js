import { call, put, getContext } from 'redux-saga/effects'
import { morfixBatchDecodeUint32Success, morfixBatchDecodeUint32Failure } from 'store/actions/morfix'

export default function* batchDecodeUint32Worker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.batchDecodeUint32, action)
    yield put(morfixBatchDecodeUint32Success(payload))
  } catch (error) {
    yield put(morfixBatchDecodeUint32Failure(error.payload ? error.payload : error))
  }
}
