import { take, fork, race, getContext } from 'redux-saga/effects'
import { DELETE_KEY_REQUEST, DELETE_KEY_SUCCESS, DELETE_KEY_FAILURE } from 'store/constants/key'

export default function* deleteKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(DELETE_KEY_REQUEST)
    yield fork(workers.key.deleteKeyWorker, action)

    yield race({
      success: take(DELETE_KEY_SUCCESS),
      fail: take(DELETE_KEY_FAILURE)
    })
  }
}
