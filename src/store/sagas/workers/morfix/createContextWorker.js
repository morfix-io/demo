import { call, put, getContext } from 'redux-saga/effects'
import { morfixCreateContextSuccess, morfixCreateContextFailure } from 'store/actions/morfix'

export default function* createContextWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.createContext, action)
    yield put(morfixCreateContextSuccess(payload))
  } catch (error) {
    yield put(morfixCreateContextFailure(error.payload ? error.payload : error))
  }
}
