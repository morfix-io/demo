import { call, put, getContext } from 'redux-saga/effects'
import { morfixCreateIntegerEncoderSuccess, morfixCreateIntegerEncoderFailure } from 'store/actions/morfix'

export default function* createIntegerEncoderWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.createIntegerEncoder, action)
    yield put(morfixCreateIntegerEncoderSuccess(payload))
  } catch (error) {
    yield put(morfixCreateIntegerEncoderFailure(error.payload ? error.payload : error))
  }
}
