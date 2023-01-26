import { take, fork, race, getContext } from 'redux-saga/effects'
import {
  MORFIX_ENGINE_CREATE_ACTION_REQUEST,
  MORFIX_ENGINE_CREATE_ACTION_SUCCESS,
  MORFIX_ENGINE_CREATE_ACTION_FAILURE
} from 'store/constants/morfix'

export default function* engineCreateActionWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_ENGINE_CREATE_ACTION_REQUEST)
    yield fork(workers.morfix.engineCreateActionWorker, action)

    yield race({
      success: take(MORFIX_ENGINE_CREATE_ACTION_SUCCESS),
      fail: take(MORFIX_ENGINE_CREATE_ACTION_FAILURE)
    })
  }
}
