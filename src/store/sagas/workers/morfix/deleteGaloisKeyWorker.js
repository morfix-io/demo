import { call, put, getContext } from 'redux-saga/effects'
import { morfixDeleteGaloisKeySuccess, morfixDeleteGaloisKeyFailure } from 'store/actions/morfix'

export default function* deleteGaloisKeyWorker(action) {
  try {
    const { worker } = yield getContext('api')
    const { payload } = yield call(worker.deleteGaloisKey, action)
    yield put(morfixDeleteGaloisKeySuccess(payload))
  } catch (error) {
    yield put(morfixDeleteGaloisKeyFailure(error.payload ? error.payload : error))
  }
}
