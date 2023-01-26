import { take, fork, race, getContext, put } from 'redux-saga/effects'
import {
  MORFIX_DOWNLOAD_PUBLIC_KEY_REQUEST,
  MORFIX_DOWNLOAD_PUBLIC_KEY_SUCCESS,
  MORFIX_DOWNLOAD_PUBLIC_KEY_FAILURE
} from 'store/constants/morfix'

import { morfixTriggerDownloadRequest } from 'store/actions/morfix'

export default function* downloadPublicKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_DOWNLOAD_PUBLIC_KEY_REQUEST)
    yield fork(workers.morfix.downloadPublicKeyWorker, action)

    const { success } = yield race({
      success: take(MORFIX_DOWNLOAD_PUBLIC_KEY_SUCCESS),
      fail: take(MORFIX_DOWNLOAD_PUBLIC_KEY_FAILURE)
    })

    if (success) {
      yield put(
        morfixTriggerDownloadRequest({
          url: success.payload.link,
          fileName: success.payload.name
        })
      )
    }
  }
}
