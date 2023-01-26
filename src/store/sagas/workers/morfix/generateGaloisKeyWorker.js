import { call, put, getContext } from 'redux-saga/effects'
import { morfixGenerateGaloisKeySuccess, morfixGenerateGaloisKeyFailure } from 'store/actions/morfix'

export default function* generateGaloisKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.generateGaloisKey, action)
    yield put(morfixGenerateGaloisKeySuccess(payload))
  } catch (error) {
    yield put(morfixGenerateGaloisKeyFailure(error.payload ? error.payload : error))
  }
}
