import { call, put, getContext } from 'redux-saga/effects'
import { morfixCkksDecodeFloat64Success, morfixCkksDecodeFloat64Failure } from 'store/actions/morfix'

export default function* ckksDecodeFloat64Worker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.ckksDecodeFloat64, action)
    yield put(morfixCkksDecodeFloat64Success(payload))
  } catch (error) {
    yield put(morfixCkksDecodeFloat64Failure(error.payload ? error.payload : error))
  }
}
