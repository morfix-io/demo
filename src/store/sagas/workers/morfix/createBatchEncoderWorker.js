import { call, put, getContext } from 'redux-saga/effects'
import { morfixCreateBatchEncoderSuccess, morfixCreateBatchEncoderFailure } from 'store/actions/morfix'

export default function* createBatchEncoderWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.createBatchEncoder, action)
    yield put(morfixCreateBatchEncoderSuccess(payload))
  } catch (error) {
    yield put(morfixCreateBatchEncoderFailure(error.payload ? error.payload : error))
  }
}
