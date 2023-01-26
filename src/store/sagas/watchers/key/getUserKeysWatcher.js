import { take, fork, getContext } from 'redux-saga/effects'
import { GET_USER_KEYS_REQUEST } from 'store/constants/key'

export default function* getUserKeysWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(GET_USER_KEYS_REQUEST)
    yield fork(workers.key.getUserKeysWorker, action)
  }
}
