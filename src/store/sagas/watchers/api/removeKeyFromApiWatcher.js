import { take, fork, race, getContext } from 'redux-saga/effects'
import {
  REMOVE_KEY_FROM_API_REQUEST,
  REMOVE_KEY_FROM_API_SUCCESS,
  REMOVE_KEY_FROM_API_FAILURE
} from 'store/constants/api'

export default function* removeKeyFromApiWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(REMOVE_KEY_FROM_API_REQUEST)
    yield fork(workers.api.removeKeyFromApiWorker, action)

    yield race({
      success: take(REMOVE_KEY_FROM_API_SUCCESS),
      fail: take(REMOVE_KEY_FROM_API_FAILURE)
    })
  }
}
