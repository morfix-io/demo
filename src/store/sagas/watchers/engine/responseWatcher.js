import { take, fork, race, getContext } from 'redux-saga/effects'
import { ENGINE_RESPONSE_REQUEST, ENGINE_RESPONSE_SUCCESS, ENGINE_RESPONSE_FAILURE } from 'store/constants/engine'

export default function* responseWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(ENGINE_RESPONSE_REQUEST)

    yield fork(workers.engine.responseWorker, action)

    yield race({
      success: take(ENGINE_RESPONSE_SUCCESS),
      failure: take(ENGINE_RESPONSE_FAILURE)
    })
  }
}
