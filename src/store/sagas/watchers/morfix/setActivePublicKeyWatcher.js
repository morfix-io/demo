import { take, getContext, fork, race, put } from 'redux-saga/effects'
import {
  MORFIX_SET_ACTIVE_PUBLIC_KEY_REQUEST,
  MORFIX_SET_ACTIVE_PUBLIC_KEY_SUCCESS,
  MORFIX_SET_ACTIVE_PUBLIC_KEY_FAILURE
} from 'store/constants/morfix'

import { morfixCreateEncryptorRequest } from 'store/actions/morfix'

import shortid from 'shortid'

export default function* setActivePublicKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_SET_ACTIVE_PUBLIC_KEY_REQUEST)
    yield fork(workers.morfix.setActivePublicKeyWorker, action)

    const { success } = yield race({
      success: take(MORFIX_SET_ACTIVE_PUBLIC_KEY_SUCCESS),
      fail: take(MORFIX_SET_ACTIVE_PUBLIC_KEY_FAILURE)
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
