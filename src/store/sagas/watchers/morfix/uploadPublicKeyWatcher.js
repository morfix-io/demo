import { take, fork, race, getContext, put } from 'redux-saga/effects'
import {
  MORFIX_UPLOAD_PUBLIC_KEY_REQUEST,
  MORFIX_UPLOAD_PUBLIC_KEY_SUCCESS,
  MORFIX_UPLOAD_PUBLIC_KEY_FAILURE
} from 'store/constants/morfix'

import { morfixCreateEncryptorRequest } from 'store/actions/morfix'

import shortid from 'shortid'

export default function* uploadPublicKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_UPLOAD_PUBLIC_KEY_REQUEST)
    yield fork(workers.morfix.uploadPublicKeyWorker, action)

    const { success } = yield race({
      success: take(MORFIX_UPLOAD_PUBLIC_KEY_SUCCESS),
      fail: take(MORFIX_UPLOAD_PUBLIC_KEY_FAILURE)
    })

    // Construct the Encryptor
    if (success) {
      yield put(
        morfixCreateEncryptorRequest({
          id: shortid(),
          publicKeyId: success.payload.id
        })
      )
    }
  }
}
