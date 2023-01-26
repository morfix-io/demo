import { take, fork, race, getContext } from 'redux-saga/effects'
import {
  MORFIX_TRIGGER_DOWNLOAD_REQUEST,
  MORFIX_TRIGGER_DOWNLOAD_SUCCESS,
  MORFIX_TRIGGER_DOWNLOAD_FAILURE
} from 'store/constants/morfix'

export default function* triggerDownloadWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_TRIGGER_DOWNLOAD_REQUEST)
    yield fork(workers.morfix.triggerDownloadWorker, action)

    yield race({
      success: take(MORFIX_TRIGGER_DOWNLOAD_SUCCESS),
      fail: take(MORFIX_TRIGGER_DOWNLOAD_FAILURE)
    })
  }
}
