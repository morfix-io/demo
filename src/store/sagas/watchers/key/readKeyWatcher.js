import { take, fork, getContext } from 'redux-saga/effects'
import { READ_KEY_REQUEST } from 'store/constants/key'

export default function* readKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(READ_KEY_REQUEST)
    yield fork(workers.key.readKeyWorker, action)
  }
}
