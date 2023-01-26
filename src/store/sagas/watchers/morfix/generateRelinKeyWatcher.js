import { take, fork, race, getContext } from 'redux-saga/effects'
import {
  MORFIX_GENERATE_RELIN_KEY_REQUEST,
  MORFIX_GENERATE_RELIN_KEY_SUCCESS,
  MORFIX_GENERATE_RELIN_KEY_FAILURE
} from 'store/constants/morfix'

export default function* generateRelinKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_GENERATE_RELIN_KEY_REQUEST)
    yield fork(workers.morfix.generateRelinKeyWorker, action)

    yield race({
      success: take(MORFIX_GENERATE_RELIN_KEY_SUCCESS),
      fail: take(MORFIX_GENERATE_RELIN_KEY_FAILURE)
    })
  }
}
