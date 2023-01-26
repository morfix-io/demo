import { call, put, getContext } from 'redux-saga/effects'
import { morfixCreateEncParmsSuccess, morfixCreateEncParmsFailure } from 'store/actions/morfix'

export default function* createEncParmsWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.createEncParms, action)
    yield put(morfixCreateEncParmsSuccess(payload))
  } catch (error) {
    yield put(morfixCreateEncParmsFailure(error.payload ? error.payload : error))
  }
}
