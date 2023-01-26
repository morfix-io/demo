import { call, put, getContext } from 'redux-saga/effects'
import { morfixCreateCkksEncoderSuccess, morfixCreateCkksEncoderFailure } from 'store/actions/morfix'

export default function* createCkksEncoderWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.createCkksEncoder, action)
    yield put(morfixCreateCkksEncoderSuccess(payload))
  } catch (error) {
    yield put(morfixCreateCkksEncoderFailure(error.payload ? error.payload : error))
  }
}
