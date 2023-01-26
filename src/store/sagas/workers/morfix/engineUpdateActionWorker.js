import { put } from 'redux-saga/effects'
import { morfixEngineUpdateActionSuccess, morfixEngineUpdateActionFailure } from 'store/actions/morfix'

export default function* engineUpdateActionWorker(action) {
  try {
    yield put(morfixEngineUpdateActionSuccess(action.payload))
  } catch (error) {
    yield put(morfixEngineUpdateActionFailure(error.payload ? error.payload : error))
  }
}
