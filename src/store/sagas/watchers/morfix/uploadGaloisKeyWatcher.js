import { take, fork, race, getContext } from 'redux-saga/effects'
import {
  MORFIX_UPLOAD_GALOIS_KEY_REQUEST,
  MORFIX_UPLOAD_GALOIS_KEY_SUCCESS,
  MORFIX_UPLOAD_GALOIS_KEY_FAILURE
} from 'store/constants/morfix'

export default function* uploadGaloisKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_UPLOAD_GALOIS_KEY_REQUEST)
    yield fork(workers.morfix.uploadGaloisKeyWorker, action)

    yield race({
      success: take(MORFIX_UPLOAD_GALOIS_KEY_SUCCESS),
      fail: take(MORFIX_UPLOAD_GALOIS_KEY_FAILURE)
    })
  }
}
