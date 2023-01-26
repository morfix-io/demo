import { put } from 'redux-saga/effects'
import { morfixEngineCreateActionSuccess, morfixEngineCreateActionFailure } from 'store/actions/morfix'

export default function* engineCreateActionWorker(action) {
  try {
    yield put(morfixEngineCreateActionSuccess(action.payload))
  } catch (error) {
    yield put(morfixEngineCreateActionFailure(error.payload ? error.payload : error))
  }
}
