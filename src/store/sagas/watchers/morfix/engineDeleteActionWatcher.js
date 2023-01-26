import { take, fork, race, getContext } from 'redux-saga/effects'
import {
  MORFIX_ENGINE_DELETE_ACTION_REQUEST,
  MORFIX_ENGINE_DELETE_ACTION_SUCCESS,
  MORFIX_ENGINE_DELETE_ACTION_FAILURE
} from 'store/constants/morfix'

export default function* engineDeleteActionWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_ENGINE_DELETE_ACTION_REQUEST)
    yield fork(workers.morfix.engineDeleteActionWorker, action)

    yield race({
      success: take(MORFIX_ENGINE_DELETE_ACTION_SUCCESS),
      fail: take(MORFIX_ENGINE_DELETE_ACTION_FAILURE)
    })
  }
}
