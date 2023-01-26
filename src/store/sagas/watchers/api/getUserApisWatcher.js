import { take, fork, getContext } from 'redux-saga/effects'
import { GET_USER_APIS_REQUEST } from 'store/constants/api'

export default function* getUserApisWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(GET_USER_APIS_REQUEST)
    yield fork(workers.api.getUserApisWorker, action)
  }
}
