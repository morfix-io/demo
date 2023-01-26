import { take, fork, race, getContext } from 'redux-saga/effects'
import {
  MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_REQUEST,
  MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_SUCCESS,
  MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_FAILURE
} from 'store/constants/morfix'

export default function* engineExecuteAllActionsWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_REQUEST)
    yield fork(workers.morfix.engineExecuteAllActionsWorker, action)

    yield race({
      success: take(MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_SUCCESS),
      fail: take(MORFIX_ENGINE_EXECUTE_ALL_ACTIONS_FAILURE)
    })
  }
}
