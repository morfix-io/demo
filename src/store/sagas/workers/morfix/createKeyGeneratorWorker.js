import { call, put, getContext } from 'redux-saga/effects'
import { morfixCreateKeyGeneratorSuccess, morfixCreateKeyGeneratorFailure } from 'store/actions/morfix'

export default function* createKeyGeneratorWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.createKeyGenerator, action)
    yield put(morfixCreateKeyGeneratorSuccess(payload))
  } catch (error) {
    yield put(morfixCreateKeyGeneratorFailure(error.payload ? error.payload : error))
  }
}
