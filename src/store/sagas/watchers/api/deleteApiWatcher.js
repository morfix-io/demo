import { take, fork, race, getContext } from 'redux-saga/effects'
import { DELETE_API_REQUEST, DELETE_API_SUCCESS, DELETE_API_FAILURE } from 'store/constants/api'

export default function* deleteApiWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(DELETE_API_REQUEST)
    yield fork(workers.api.deleteApiWorker, action)

    yield race({
      success: take(DELETE_API_SUCCESS),
      fail: take(DELETE_API_FAILURE)
    })
  }
}
