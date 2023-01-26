import { take, fork, race, getContext, put } from 'redux-saga/effects'
import {
  MORFIX_GENERATE_PUBLIC_KEY_REQUEST,
  MORFIX_GENERATE_PUBLIC_KEY_SUCCESS,
  MORFIX_GENERATE_PUBLIC_KEY_FAILURE
} from 'store/constants/morfix'

import { morfixCreateEncryptorRequest } from 'store/actions/morfix'

import shortid from 'shortid'

export default function* generatePublicKeyWatcher() {
  const workers = yield getContext('workers')
  while (true) {
    const action = yield take(MORFIX_GENERATE_PUBLIC_KEY_REQUEST)
    yield fork(workers.morfix.generatePublicKeyWorker, action)

    const { success } = yield race({
      success: take(MORFIX_GENERATE_PUBLIC_KEY_SUCCESS),
      fail: take(MORFIX_GENERATE_PUBLIC_KEY_FAILURE)
    })

    // If the payload manually specified to stop continuation of next sagas, return
    if (action.payload.continue === false) {
      continue
    }

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
