import { take, fork, getContext } from 'redux-saga/effects'
import { READ_API_REQUEST } from 'store/constants/api'

export default function* readApiWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(READ_API_REQUEST)
    yield fork(workers.api.readApiWorker, action)
  }
}
