import { call, put, getContext } from 'redux-saga/effects'
import { morfixCkksEncodeFloat64Success, morfixCkksEncodeFloat64Failure } from 'store/actions/morfix'

export default function* ckksEncodeFloat64Worker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.ckksEncodeFloat64, action)
    yield put(morfixCkksEncodeFloat64Success(payload))
  } catch (error) {
    yield put(morfixCkksEncodeFloat64Failure(error.payload ? error.payload : error))
  }
}
