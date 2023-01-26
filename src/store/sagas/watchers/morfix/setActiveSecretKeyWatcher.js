import { take, getContext, fork, race, put } from 'redux-saga/effects'
import {
  MORFIX_SET_ACTIVE_SECRET_KEY_REQUEST,
  MORFIX_SET_ACTIVE_SECRET_KEY_SUCCESS,
  MORFIX_SET_ACTIVE_SECRET_KEY_FAILURE
} from 'store/constants/morfix'

import { morfixCreateDecryptorRequest } from 'store/actions/morfix'

import shortid from 'shortid'

export default function* setActiveSecretKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_SET_ACTIVE_SECRET_KEY_REQUEST)
    yield fork(workers.morfix.setActiveSecretKeyWorker, action)

    const { success } = yield race({
      success: take(MORFIX_SET_ACTIVE_SECRET_KEY_SUCCESS),
      fail: take(MORFIX_SET_ACTIVE_SECRET_KEY_FAILURE)
    })

    // Construct the Decryptor
    if (success) {
      yield put(
        morfixCreateDecryptorRequest({
          id: shortid(),
          secretKeyId: success.payload.id
        })
      )
    }
  }
}
