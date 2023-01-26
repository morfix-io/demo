import { take, fork, race, getContext, put } from 'redux-saga/effects'
import { ENGINE_COMPUTE_REQUEST, ENGINE_COMPUTE_SUCCESS, ENGINE_COMPUTE_FAILURE } from 'store/constants/engine'

import { engineResponseRequest } from 'store/actions/engine'

export default function* computeWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(ENGINE_COMPUTE_REQUEST)

    yield fork(workers.engine.computeWorker, action)

    const { success } = yield race({
      success: take(ENGINE_COMPUTE_SUCCESS),
      failure: take(ENGINE_COMPUTE_FAILURE)
    })

    if (success) {
      yield put(
        engineResponseRequest({
          action: action,
          result: success.payload.result
        })
      )
    }
  }
}
