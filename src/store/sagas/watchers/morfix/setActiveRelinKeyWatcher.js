import { take, getContext, fork, race } from 'redux-saga/effects'
import {
  MORFIX_SET_ACTIVE_RELIN_KEY_REQUEST,
  MORFIX_SET_ACTIVE_RELIN_KEY_SUCCESS,
  MORFIX_SET_ACTIVE_RELIN_KEY_FAILURE
} from 'store/constants/morfix'

export default function* setActiveRelinKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_SET_ACTIVE_RELIN_KEY_REQUEST)
    yield fork(workers.morfix.setActiveRelinKeyWorker, action)

    yield race({
      success: take(MORFIX_SET_ACTIVE_RELIN_KEY_SUCCESS),
      fail: take(MORFIX_SET_ACTIVE_RELIN_KEY_FAILURE)
    })
  }
}
