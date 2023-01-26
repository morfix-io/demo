import { put } from 'redux-saga/effects'
import { morfixEngineDeleteActionSuccess, morfixEngineDeleteActionFailure } from 'store/actions/morfix'

export default function* engineDeleteActionWorker(action) {
  try {
    yield put(morfixEngineDeleteActionSuccess(action.payload))
  } catch (error) {
    yield put(morfixEngineDeleteActionFailure(error.payload ? error.payload : error))
  }
}
