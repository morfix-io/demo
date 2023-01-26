import { take, fork, race, getContext } from 'redux-saga/effects'
import {
  ENGINE_UPLOAD_SECRET_KEY_REQUEST,
  ENGINE_UPLOAD_SECRET_KEY_SUCCESS,
  ENGINE_UPLOAD_SECRET_KEY_FAILURE
} from 'store/constants/engine'

export default function* uploadSecretKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(ENGINE_UPLOAD_SECRET_KEY_REQUEST)

    yield fork(workers.engine.uploadSecretKeyWorker, action)

    yield race({
      success: take(ENGINE_UPLOAD_SECRET_KEY_SUCCESS),
      failure: take(ENGINE_UPLOAD_SECRET_KEY_FAILURE)
    })
  }
}
