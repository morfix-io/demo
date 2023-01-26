import { take, fork, race, getContext } from 'redux-saga/effects'
import { CREATE_KEY_REQUEST, CREATE_KEY_SUCCESS, CREATE_KEY_FAILURE } from 'store/constants/key'

export default function* createKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(CREATE_KEY_REQUEST)
    yield fork(workers.key.createKeyWorker, action)

    yield race({
      success: take(CREATE_KEY_SUCCESS),
      fail: take(CREATE_KEY_FAILURE)
    })
  }
}
