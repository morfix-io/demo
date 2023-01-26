import { take, fork, race, getContext } from 'redux-saga/effects'
import { ENGINE_PREPARE_REQUEST, ENGINE_PREPARE_SUCCESS, ENGINE_PREPARE_FAILURE } from 'store/constants/engine'

export default function* prepareWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(ENGINE_PREPARE_REQUEST)

    yield fork(workers.engine.prepareWorker, action)

    yield race({
      success: take(ENGINE_PREPARE_SUCCESS),
      failure: take(ENGINE_PREPARE_FAILURE)
    })
  }
}
